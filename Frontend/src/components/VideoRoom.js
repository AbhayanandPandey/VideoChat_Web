// src/components/VideoRoom.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Mic, MicOff, Video, VideoOff, LogOut, Send } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './VidroRoom.css';

// Initialize socket once
const socket = io('http://localhost:5000');

export default function VideoRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const localVideoRef = useRef();
  const peersRef = useRef({});

  const [remoteStreams, setRemoteStreams] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  const localStreamRef = useRef();

  useEffect(() => {
    const pcConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        socket.emit('join-room', roomId, socket.id);

        socket.on('user-connected', async userId => {
          if (userId === socket.id) return;

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

          setMessages(prev => [...prev, { user: 'System', message: `${userId} has joined the room.` }]);
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
          let text = data.message;
          if (typeof text === 'object') {
            text = text.message != null ? text.message : JSON.stringify(text);
          }
          if (data.user !== socket.id) {
            setMessages(prev => [...prev, { user: data.user, message: text }]);
          }
        });
      })
      .catch(err => console.error('Media error:', err));

    return () => {
      Object.values(peersRef.current).forEach(pc => pc.close());
      socket.disconnect();
    };
  }, [roomId]);

  const addRemoteStream = (id, stream) => {
    setRemoteStreams(prev => prev.some(v => v.id === id) ? prev : [...prev, { id, stream }]);
  };

  const removeRemoteStream = id => setRemoteStreams(prev => prev.filter(v => v.id !== id));

  const toggleMic = () => {
    const tracks = localStreamRef.current.getAudioTracks();
    tracks.forEach(t => t.enabled = !t.enabled);
    setMicOn(p => !p);
  };

  const toggleCam = () => {
    const tracks = localStreamRef.current.getVideoTracks();
    tracks.forEach(t => t.enabled = !t.enabled);
    setCamOn(p => !p);
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const msg = { user: socket.id, message: chatInput.trim() };
    socket.emit('chat-message', msg);
    setMessages(prev => [...prev, msg]);
    setChatInput('');
  };

  const leaveRoom = () => {
    navigate('/dashboard');
    window.location.reload();
  };

  return (
    <div className="d-flex flex-column flex-lg-row min-vh-100">
      {/* Video Section */}
      <div className="flex-fill video-bg p-3 position-relative">
        <div className="d-flex flex-wrap justify-content-center align-items-start gap-3">
          {remoteStreams.length ? remoteStreams.map(peer => (
            <video
              key={peer.id}
              ref={v => v && (v.srcObject = peer.stream)}
              autoPlay playsInline
              className="vid-lg rounded"
            />
          )) : (
            <div className="waiting-text">Waiting for others...</div>
          )}
        </div>
        <div className="local-video-wrapper ">
          <video ref={localVideoRef} autoPlay muted playsInline className="vid-sm rounded border" />
        </div>
        <div className="controls d-flex justify-content-center gap-2 p-2">
          <button className="btn btn-outline-light btn-icon" onClick={toggleMic}>{micOn ? <Mic /> : <MicOff />}</button>
          <button className="btn btn-outline-light btn-icon" onClick={toggleCam}>{camOn ? <Video /> : <VideoOff />}</button>
          <button className="btn btn-outline-danger btn-icon" onClick={leaveRoom}><LogOut /></button>
        </div>
      </div>
      {/* Chat Section */}
      <div className="chat-section bg-light d-flex flex-column p-3">
        <div className="flex-grow-1 overflow-auto mb-3">
          {messages.map((m,i) => (
            <div key={i} className={`chat-msg ${m.user===socket.id?'self':'other'}`}>
              <strong>{m.user===socket.id?'You':m.user==='System'?'🔔':m.user.slice(0,6)}:</strong> {m.message}
            </div>
          ))}
        </div>
        <div className="d-flex">
          <input
            className="form-control me-2"
            placeholder="Type a message..."
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key==='Enter' && sendMessage()}
          />
          <button className="btn btn-primary" onClick={sendMessage}><Send /></button>
        </div>
      </div>
    </div>
  );
}