// VideoHome.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navbar/navbarlogin.jsx'; // Adjust the import path as necessary
import Footer from '../Footer/footerlogin.jsx'; // Adjust the import path as necessary
import { Link } from 'react-router-dom';
const VideoHome = () => {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [joinDetails, setJoinDetails] = useState({ roomId: '', password: '' });
  const [createDetails, setCreateDetails] = useState({ roomId: '', password: '' });

  const navigate = useNavigate();

  const handleGenerateRoomId = () => {
    const randomId = Math.random().toString(36).substr(2, 16);  // 16 alphanumeric characters
    setCreateDetails(prev => ({ ...prev, roomId: randomId }));
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    navigate(`join/${joinDetails.roomId}`, { state: { password: joinDetails.password } });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    setShowSuccessPopup(true);
    setTimeout(() => {
      setShowSuccessPopup(false);
      navigate(`room/${createDetails.roomId}`, { state: { password: createDetails.password } });
    }, 1500); // show success for 1.5 seconds
  };

  return (
    <>
    <Navbar />
    
    <div className="d-flex flex-column justify-content-center align-items-center bg-light position-relative" style={{ height: '480px' }}>
      <h1 className="mb-4 text-primary">👋 Welcome to Video Chat!</h1>
      <p className="mb-5 text-muted">Connect, Collaborate, Communicate</p>

      <div className="d-flex gap-4">
        <button 
          className="btn btn-success btn-lg px-5"
          onClick={() => setShowCreateForm(true)}
        >
          Create Meeting
        </button>

        <button 
          className="btn btn-primary btn-lg px-5"
          onClick={() => setShowJoinForm(true)}
        >
          Join Meeting
        </button>
      </div>

      {/* Join Meeting Form */}
      {showJoinForm && (
        <div className="position-absolute top-50 start-50 translate-middle bg-white p-5 rounded shadow" style={{ zIndex: 1000, width: '90%', maxWidth: '400px' }}>
          {/* Cut button */}
          <button 
            className="btn-close position-absolute top-0 end-0 m-3"
            onClick={() => setShowJoinForm(false)}
          ></button>

          <h3 className="mb-4 text-center">Join a Meeting</h3>
          <form onSubmit={handleJoinSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Room ID"
                value={joinDetails.roomId}
                onChange={e => setJoinDetails(prev => ({ ...prev, roomId: e.target.value }))}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={joinDetails.password}
                onChange={e => setJoinDetails(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Join</button>
            <button type="button" className="btn btn-secondary mt-3 w-100" onClick={() => setShowJoinForm(false)}>Cancel</button>
          </form>
        </div>
      )}

      {/* Create Meeting Form */}
      {showCreateForm && (
        <div className="position-absolute top-50 start-50 translate-middle bg-white p-5 rounded shadow" style={{ zIndex: 1000, width: '90%', maxWidth: '400px' }}>
          {/* Cut button */}
          <button 
            className="btn-close position-absolute top-0 end-0 m-3"
            onClick={() => setShowCreateForm(false)}
          ></button>

          <h3 className="mb-4 text-center">Create a Meeting</h3>
          <form onSubmit={handleCreateSubmit}>
            <div className="mb-3 d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Generated Room ID"
                value={createDetails.roomId}
                readOnly
              />
              <button 
                type="button" 
                className="btn btn-outline-success ms-2"
                onClick={handleGenerateRoomId}
              >
                Generate
              </button>
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Create Password"
                value={createDetails.password}
                onChange={e => setCreateDetails(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">Create Room</button>
            <button type="button" className="btn btn-secondary mt-3 w-100" onClick={() => setShowCreateForm(false)}>Cancel</button>
          </form>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="position-fixed top-0 start-50 translate-middle-x mt-5 p-3 bg-success text-white rounded shadow" style={{ zIndex: 1050 }}>
          Room created successfully!
        </div>
      )}
    </div>
    <Footer />  
    </>
  );
};

export default VideoHome;
