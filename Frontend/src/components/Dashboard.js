import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [room, setRoom] = useState('');
  const navigate = useNavigate();

  return (
    <div>
      <input placeholder="Room ID" onChange={e => setRoom(e.target.value)} />
      <button onClick={() => navigate(`/room/${room}`)}>Join Room</button>
    </div>
  );
}
export default Dashboard;