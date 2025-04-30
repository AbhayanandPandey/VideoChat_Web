import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './VideoConference.css';
import process from 'process';
window.process = process;

const socket = io('http://localhost:5000');

const VideoConference = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { password } = location.state || {};

  const [peers, setPeers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userVideo = useRef();
  const peersRef = useRef([]);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(currentStream => {
      setStream(currentStream);
      if (userVideo.current) userVideo.current.srcObject = currentStream;

      socket.emit('join-room', { roomId, password });

      socket.on('all-users', users => {
        const peerConnections = [];
        users.forEach(userID => {
          const peer = createPeer(userID, socket.id, currentStream);
          peersRef.current.push({ peerID: userID, peer });
          peerConnections.push({ peerID: userID, peer });
        });
        setPeers(peerConnections);
      });

      socket.on('user-joined', payload => {
        const peer = addPeer(payload.signal, payload.callerID, currentStream);
        peersRef.current.push({ peerID: payload.callerID, peer });
        setPeers(prev => [...prev, { peerID: payload.callerID, peer }]);
      });

      socket.on('receiving-returned-signal', payload => {
        const item = peersRef.current.find(p => p.peerID === payload.id);
        if (item) {
          try {
            item.peer.signal(payload.signal);
          } catch (err) {
            console.error('Error signaling peer (returning):', err);
          }
        }
      });

      socket.on('receive-message', message => {
        setMessages(prev => [...prev, message]);
      });

      return () => {
        peersRef.current.forEach(p => p.peer.destroy());
        if (userVideo.current?.srcObject) {
          userVideo.current.srcObject.getTracks().forEach(track => track.stop());
        }
        socket.disconnect();
      };
    });
  }, [roomId, password, navigate]);

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
      config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }
    });

    peer.on('signal', signal => {
      socket.emit('sending-signal', { userToSignal, callerID, signal });
    });

    peer.on('close', () => {
      peersRef.current = peersRef.current.filter(p => p.peer !== peer);
      setPeers(prev => prev.filter(p => p.peer !== peer));
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
      config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }
    });

    peer.on('signal', signal => {
      socket.emit('returning-signal', { signal, callerID });
    });

    peer.on('close', () => {
      peersRef.current = peersRef.current.filter(p => p.peer !== peer);
      setPeers(prev => prev.filter(p => p.peer !== peer));
    });

    try {
      if (incomingSignal) peer.signal(incomingSignal);
    } catch (err) {
      console.error('Failed to signal peer (incoming):', err);
    }

    return peer;
  };

  const toggleMute = () => {
    if (stream) stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
  };

  const toggleVideo = () => {
    if (stream) stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
  };

  const leaveCall = () => {
    peersRef.current.forEach(p => p.peer.destroy());
    if (userVideo.current?.srcObject) {
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
        const sender = peer._pc.getSenders().find(s => s.track?.kind === 'video');
        if (sender) sender.replaceTrack(screenTrack);
      });

      screenTrack.onended = () => {
        const originalTrack = stream.getVideoTracks()[0];
        peersRef.current.forEach(({ peer }) => {
          const sender = peer._pc.getSenders().find(s => s.track?.kind === 'video');
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
      <div className="flex-grow-1 d-flex flex-column p-3 bg-dark text-white">
        <h5 className="text-center mb-3">Video Room</h5>
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

      <div className="bg-light border-start d-flex flex-column" style={{ width: '300px' }}>
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
    </div>
  );
};

const Video = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on('stream', stream => {
      if (ref.current) ref.current.srcObject = stream;
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