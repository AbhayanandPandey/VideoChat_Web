import React, { useEffect, useRef, useState } from 'react';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import {
    FaArrowLeft,
    FaArrowRight,
    FaMicrophoneSlash,
    FaVideoSlash,
    FaDesktop,
    FaSignOutAlt
} from 'react-icons/fa';
import './Video.css';

const dummyVideos = [
    { id: 1, name: 'Person 1' },
    { id: 2, name: 'Person 2' },
    { id: 3, name: 'Person 3' },
    { id: 4, name: 'Person 4' },
    { id: 5, name: 'Person 5' },
];
 
const VideoRoom = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const isMobile = window.innerWidth < 768;
    const videosPerPage = isMobile ? 2 : 4;
    const maxPage = Math.ceil(dummyVideos.length / videosPerPage) - 1;

    const handlePrev = () => currentPage > 0 && setCurrentPage(currentPage - 1);
    const handleNext = () => currentPage < maxPage && setCurrentPage(currentPage + 1);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, newMessage]);
            setNewMessage('');
        }
    };

    const visibleVideos = dummyVideos.slice(
        currentPage * videosPerPage,
        (currentPage + 1) * videosPerPage
    );

    return (
        <Container fluid className="video-room">
            <Row className="h-100">
                <Col md={9} xs={12} className="video-section">
                    <div className="videos-wrapper">
                        <div className="slider-buttons left">
                            <FaArrowLeft
                                onClick={handlePrev}
                                className={`slider-icon ${currentPage === 0 ? 'disabled' : ''}`}
                            />
                        </div>

                        <div className="videos-grid">
                            {visibleVideos.map((video) => (
                                <div key={video.id} className="video-box">
                                    <div className="video-name">{video.name}</div>
                                    <div className="video-feed">Video Stream Here</div>
                                </div>
                            ))}
                        </div>

                        <div className="slider-buttons right">
                            <FaArrowRight
                                onClick={handleNext}
                                className={`slider-icon ${currentPage === maxPage ? 'disabled' : ''}`}
                            />
                        </div>
                    </div>

                    <div className="controls">
                        <Button variant="danger" className="mx-2"><FaVideoSlash /></Button>
                        <Button variant="warning" className="mx-2"><FaMicrophoneSlash /></Button>
                        <Button variant="info" className="mx-2"><FaDesktop /></Button>
                        <Button variant="secondary" className="mx-2"><FaSignOutAlt /></Button>
                    </div>
                </Col>

                {/* Chat Section */}
                <Col md={3} xs={12} className="chat-section">
                    <div className="chat-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className="chat-message">{msg}</div>
                        ))}
                    </div>
                    <Form onSubmit={handleSendMessage} className="chat-input-area">
                        <Form.Control
                            type="text"
                            value={newMessage}
                            placeholder="Type a message..."
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="chat-input"
                        />
                        <Button type="submit" variant="primary" className="send-btn">Send</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export { VideoRoom };
import { useParams, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './VideoConference.css';

const socket = io({
  transports: ['websocket'], 
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});   

const VideoConference = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const { password } = location.state || {};

  const [peers, setPeers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userVideo = useRef();
  const peersRef = useRef([]);
  const [stream, setStream] = useState();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(currentStream => {
      setStream(currentStream);
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }

      socket.emit('join-room', { roomId, password });

      socket.on('all-users', users => {
        const peers = [];
        users.forEach(userID => {
          const peer = createPeer(userID, socket.id, currentStream);
          peersRef.current.push({ peerID: userID, peer });
          peers.push({ peerID: userID, peer });
        });
        setPeers(peers);
      });

      socket.on('user-joined', payload => {
        const peer = addPeer(payload.signal, payload.callerID, currentStream);
        peersRef.current.push({ peerID: payload.callerID, peer });
        setPeers(users => [...users, { peerID: payload.callerID, peer }]);
      });

      socket.on('receiving-returned-signal', payload => {
        const item = peersRef.current.find(p => p.peerID === payload.id);
        if (item) item.peer.signal(payload.signal);
      });

      socket.on('receive-message', message => {
        setMessages(prev => [...prev, message]);
      });

      socket.on('user-left', id => {
        const peerObj = peersRef.current.find(p => p.peerID === id);
        if (peerObj) {
          peerObj.peer.destroy();
        }
        peersRef.current = peersRef.current.filter(p => p.peerID !== id);
        setPeers(users => users.filter(p => p.peerID !== id));
      });

      return () => {
        peersRef.current.forEach(p => p.peer.destroy());
        socket.disconnect();
      };
    }).catch(err => {
      console.error('Error getting media devices:', err);
    });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          {
            urls: 'turn:relay.metered.ca:80',
            username: 'openrelayproject',
            credential: 'openrelayproject',
          }
        ]
      }
    });

    peer.on('signal', signal => {
      socket.emit('sending-signal', { userToSignal, callerID, signal });
    });

    peer.on('close', () => {
      peersRef.current = peersRef.current.filter(p => p.peer !== peer);
      setPeers(users => users.filter(p => p.peer !== peer));
    });

    peer.on('error', err => console.error('Peer Error:', err));

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          {
            urls: 'turn:relay.metered.ca:80',
            username: 'openrelayproject',
            credential: 'openrelayproject',
          }
        ]
      }
    });

    peer.on('signal', signal => {
      socket.emit('returning-signal', { signal, callerID });
    });

    peer.on('close', () => {
      peersRef.current = peersRef.current.filter(p => p.peer !== peer);
      setPeers(users => users.filter(p => p.peer !== peer));
    });

    peer.on('error', err => console.error('Peer Error:', err));

    try {
      peer.signal(incomingSignal);
    } catch (err) {
      console.error('Error signaling peer:', err);
    }

    return peer;
  }

  const toggleMute = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
      }
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
      }
    }
  };

  const leaveCall = () => {
    peersRef.current.forEach(p => p.peer.destroy());
    if (userVideo.current && userVideo.current.srcObject) {
      userVideo.current.srcObject.getTracks().forEach(track => track.stop());
    }
    socket.disconnect();
    window.location.href = '/index';
  };

  const shareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenTrack = screenStream.getVideoTracks()[0];

      peersRef.current.forEach(({ peer }) => {
        const sender = peer._pc.getSenders().find(s => s.track && s.track.kind === 'video');
        if (sender) sender.replaceTrack(screenTrack);
      });

      screenTrack.onended = () => {
        const originalTrack = stream.getVideoTracks()[0];
        peersRef.current.forEach(({ peer }) => {
          const sender = peer._pc.getSenders().find(s => s.track && s.track.kind === 'video');
          if (sender) sender.replaceTrack(originalTrack);
        });
      };
    } catch (err) {
      console.error('Screen Share Error:', err);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      socket.emit('send-message', { roomId, message: newMessage });
      setMessages(prev => [...prev, { user: 'You', text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className="d-flex vh-100 overflow-hidden">
      <div className="bg-light border-end d-flex flex-column" style={{ width: '300px' }}>
        <div className="flex-grow-1 overflow-auto p-3">
          <h5 className="text-center mb-4">Group Chat</h5>
          <div className="chat-messages mb-3">
            {messages.map((msg, idx) => (
              <div key={idx} className="chat-message mb-2 p-2 rounded bg-white shadow-sm">
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={sendMessage} className="d-flex p-3 border-top">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">Send</button>
        </form>
      </div>

      <div className="flex-grow-1 d-flex flex-column p-3 bg-dark">
        <h5 className="text-white text-center mb-3">Video Room</h5>

        <div className="row g-3 flex-grow-1 overflow-auto">
          <div className="col-6 col-md-4">
            <div className="video-wrapper">
              <video playsInline muted ref={userVideo} autoPlay className="video-box" />
            </div>
          </div>
          {peers.map(({ peerID, peer }) => (
            <Video key={peerID} peer={peer} />
          ))}
        </div>

        <div className="mt-3 d-flex justify-content-center flex-wrap gap-3">
          <button className="btn btn-danger" onClick={leaveCall}>End Call</button>
          <button className="btn btn-secondary" onClick={toggleMute}>Mute</button>
          <button className="btn btn-secondary" onClick={toggleVideo}>Video</button>
          <button className="btn btn-secondary" onClick={shareScreen}>Share Screen</button>
        </div>
      </div>
    </div>
  );
};

const Video = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on('stream', stream => {
      if (ref.current) {
        ref.current.srcObject = stream;
      }
    });
  }, [peer]);

  return (
    <div className="col-6 col-md-4">
      <div className="video-wrapper">
        <video playsInline autoPlay ref={ref} className="video-box" />
      </div>
    </div>
  );
};

export default VideoConference;
