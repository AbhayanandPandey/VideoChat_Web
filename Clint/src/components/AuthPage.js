import React, { useState } from 'react';
import axios from 'axios';
import './AuthPage.css';
import { useNavigate } from 'react-router-dom';

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
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Username"
          required
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        <p onClick={switchMode} className="switch-link">
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}
export default AuthPage;