import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

function Dashboard() {
  const [room, setRoom] = useState('');
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-white">
      <div className="card p-4 shadow-lg animated fadeIn" style={{ maxWidth: '400px', width: '100%', borderRadius: '1rem' }}>
        <h2 className="text-center fw-bold mb-4">Join a Video Room</h2>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Room ID"
          value={room}
          onChange={e => setRoom(e.target.value)}
        />
        <div className="d-grid">
          <button
            className="btn btn-success fw-bold"
            onClick={() => navigate(`/room/${room}`)}
            disabled={!room.trim()}
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
