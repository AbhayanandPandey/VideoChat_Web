import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Mic, MicOff, Video, VideoOff, LogOut, Send } from 'lucide-react';
import './VidroRoom.css';

const socket = io('http://localhost:5000');

export default function VideoRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const localVideo = useRef();
  const peersRef = useRef({});
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const localStreamRef = useRef();

  useEffect(() => {
    const pcConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      localStreamRef.current = stream;
      localVideo.current.srcObject = stream;
      socket.emit('join-room', roomId, socket.id);

      socket.on('user-connected', async userId => {
        const pc = new RTCPeerConnection(pcConfig);
        peersRef.current[userId] = pc;

        stream.getTracks().forEach(track => pc.addTrack(track, stream));
        pc.onicecandidate = e => {
          if (e.candidate) {
            socket.emit('ice-candidate', { target: userId, candidate: e.candidate });
          }
        };
        pc.ontrack = e => addRemoteStream(userId, e.streams[0]);

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('offer', { target: userId, sdp: offer });
      });

      socket.on('offer', async ({ sender, sdp }) => {
        const pc = new RTCPeerConnection(pcConfig);
        peersRef.current[sender] = pc;

        stream.getTracks().forEach(track => pc.addTrack(track, stream));
        pc.onicecandidate = e => {
          if (e.candidate) {
            socket.emit('ice-candidate', { target: sender, candidate: e.candidate });
          }
        };
        pc.ontrack = e => addRemoteStream(sender, e.streams[0]);

        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit('answer', { target: sender, sdp: answer });
      });

      socket.on('answer', async ({ sender, sdp }) => {
        const pc = peersRef.current[sender];
        if (pc) await pc.setRemoteDescription(new RTCSessionDescription(sdp));
      });

      socket.on('ice-candidate', ({ sender, candidate }) => {
        const pc = peersRef.current[sender];
        if (pc) pc.addIceCandidate(new RTCIceCandidate(candidate));
      });

      socket.on('user-disconnected', id => {
        if (peersRef.current[id]) {
          peersRef.current[id].close();
          delete peersRef.current[id];
          removeRemoteStream(id);
        }
      });

      socket.on('chat-message', data => {
        setMessages(prev => [...prev, data]);
      });
    });

    return () => {
      Object.values(peersRef.current).forEach(pc => pc.close());
      socket.disconnect();
    };
  }, [roomId]);

  const addRemoteStream = (id, stream) => {
    setRemoteStreams(prev => {
      if (!prev.find(v => v.id === id)) {
        return [...prev, { id, stream }];
      }
      return prev;
    });
  };

  const removeRemoteStream = id => {
    setRemoteStreams(prev => prev.filter(v => v.id !== id));
  };

  const toggleMic = () => {
    localStreamRef.current.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
    setMicOn(prev => !prev);
  };

  const toggleCam = () => {
    localStreamRef.current.getVideoTracks().forEach(track => (track.enabled = !track.enabled));
    setCamOn(prev => !prev);
  };

  const sendMessage = () => {
    if (chatInput.trim()) {
      const messageData = { user: socket.id, message: chatInput };
      socket.emit('chat-message', messageData);
      setMessages(prev => [...prev, messageData]);
      setChatInput('');
    }
  };

  const leaveRoom = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="video-room-container">
      <div className="video-section">
        {remoteStreams.length > 0 ? (
          remoteStreams.map(peer => (
            <video
              key={peer.id}
              ref={video => video && (video.srcObject = peer.stream)}
              autoPlay
              playsInline
              className="video-player large"
            />
          ))
        ) : (
          <div className="waiting-text">Waiting for others to join...</div>
        )}
        <video ref={localVideo} autoPlay muted playsInline className="video-player small" />
        <div className="controls">
          <button onClick={toggleMic} title="Toggle Mic">{micOn ? <Mic /> : <MicOff />}</button>
          <button onClick={toggleCam} title="Toggle Camera">{camOn ? <Video /> : <VideoOff />}</button>
          <button onClick={leaveRoom} title="Leave"><LogOut /></button>
        </div>
      </div>

      <div className="chat-section">
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.user === socket.id ? 'self' : 'other'}`}>
              <strong>{m.user === socket.id ? 'You' : String(m.user).slice(0, 6)}:</strong> {String(m.message)}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} title="Send"><Send size={18} /></button>
        </div>
      </div>
    </div>
  );
}
