import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const VideoConference = () => {
  return (
    <div className="d-flex vh-100">
      {/* Left Side (Chat Section) */}
      <div className="bg-light border-end" style={{ width: '25%', overflowY: 'auto' }}>
        <div className="p-3">
          <h4 className="mb-4">Chat</h4>

          {/* Chat Messages */}
          <div className="mb-3">
            <div className="bg-white p-2 rounded shadow-sm mb-2">
              <strong>User 1:</strong> Hello!
            </div>
            <div className="bg-white p-2 rounded shadow-sm mb-2">
              <strong>User 2:</strong> Hi there!
            </div>
          </div>

          {/* Chat Input */}
          <form className="d-flex">
            <input 
              type="text" 
              className="form-control me-2" 
              placeholder="Type a message..."
            />
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Right Side (Video Section) */}
      <div className="flex-grow-1 bg-dark d-flex flex-column p-3">
        <h4 className="text-white mb-4">Video Conference</h4>

        {/* Video Grid */}
        <div className="row g-2 flex-grow-1">
          <div className="col-6">
            <div className="bg-secondary rounded h-100 d-flex align-items-center justify-content-center">
              <p className="text-white">Video 1</p>
            </div>
          </div>
          <div className="col-6">
            <div className="bg-secondary rounded h-100 d-flex align-items-center justify-content-center">
              <p className="text-white">Video 2</p>
            </div>
          </div>
          <div className="col-6">
            <div className="bg-secondary rounded h-100 d-flex align-items-center justify-content-center">
              <p className="text-white">Video 3</p>
            </div>
          </div>
          <div className="col-6">
            <div className="bg-secondary rounded h-100 d-flex align-items-center justify-content-center">
              <p className="text-white">Video 4</p>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="mt-3 d-flex justify-content-center gap-3">
          <button className="btn btn-danger">End Call</button>
          <button className="btn btn-secondary">Mute</button>
          <button className="btn btn-secondary">Stop Video</button>
        </div>
      </div>
    </div>
  );
};

export default VideoConference;
