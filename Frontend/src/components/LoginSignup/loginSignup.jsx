import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'; // Custom styles if needed

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [showForm, setShowForm] = useState(true); // <-- New state to handle close
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : form;
      const res = await axios.post(endpoint, payload);
      if (isLogin) {
        localStorage.setItem('token1', res.data.token);
        navigate('/index'); 
      } else {
        alert('Registered successfully, please login.');
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  const switchMode = () => {
    setForm({ username: '', email: '', password: '' });
    setIsLogin(!isLogin);
  };

  const handleClose = () => {
    setShowForm(false);
    navigate('/'); // Redirect to home or wherever you want
  };

  if (!showForm) return null; // Don't render form if closed

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 imaged"
      style={{

        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="card p-4 shadow-lg position-relative"
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '1rem',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        {/* Cross Button */}
        <button
          onClick={handleClose}
          className="btn btn-light position-absolute"
          style={{ top: '10px', right: '10px', borderRadius: '50%', fontWeight: 'bold' }}
        >
          ✖
        </button>

        <h2 className="text-center mb-4 fw-bold">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name='username'
                className="form-control"
                placeholder="Enter Unique username"
                value={form.username}
                required
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name='email'
              className="form-control"
              placeholder="Enter email"
              value={form.email}
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name='password'
              placeholder="Enter password"
              value={form.password}
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary fw-bold">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
          <div className="text-center">
            <p className="text-muted">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <span
                onClick={switchMode}
                className="text-primary"
                style={{ cursor: 'pointer', fontWeight: 'bold' }}
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginSignup;
