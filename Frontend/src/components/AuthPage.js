import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AuthPage.css'; // We'll enhance this too

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const res = await axios.post(endpoint, form);
      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      } else {
        alert('Registered successfully, please login.');
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  const switchMode = () => {
    setForm({ username: '', password: '' });
    setIsLogin(!isLogin);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-white">
      <div className="card p-4 shadow-lg animated fadeIn" style={{ width: '100%', maxWidth: '400px', borderRadius: '1rem' }}>
        <h2 className="text-center mb-4 fw-bold">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={form.username}
              required
              onChange={e => setForm({ ...form, username: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={form.password}
              required
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary fw-bold">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
          <div className="text-center">
            <p className="text-muted text-primary">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <span onClick={switchMode} className="text-primary switch-link" style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                {isLogin ? 'Sign Up' : 'Login'}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
