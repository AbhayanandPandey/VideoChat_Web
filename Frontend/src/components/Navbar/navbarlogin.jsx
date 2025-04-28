import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css'; // <-- ADD THIS!
import { Link } from 'react-router-dom';

const NavbarLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };
  const isActive = (path) => location.pathname === path ? 'active' : '';

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
        <div className="container-fluid mx-3">
          <a className="navbar-brand" href="/">VideoChat</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav gap-2 text-center mt-2 p-2">
              <li className="nav-item">
                <Link to="/index" className={`nav-link ${isActive("/index")}`} aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/AboutUs" className={`nav-link ${isActive("/AboutUs")}`}>About</Link>
              </li>
              <li className="nav-item">
                <Link to="/ourServices" className={`nav-link ${isActive("/ourServices")}`}>Services</Link>
              </li>
              <li className="nav-item">
                <Link to="/contactUs" className={`nav-link ${isActive("/contactUs")}`}>Contact</Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard" className={`nav-link ${isActive("/dashboard")}`}>
                  <i className="bi bi-person-fill"></i> Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal for Login/Signup */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isLogin ? 'Login' : 'Signup'}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  {!isLogin && (
                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <input type="text" className="form-control" placeholder="Enter username" required />
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" required />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    {isLogin ? 'Login' : 'Signup'}
                  </button>
                </form>
                {isLogin ? (
                  <div className="text-center">
                    <a href="#" className="d-block mb-2">Forgot Password?</a>
                    <button type="button" className="btn btn-link" onClick={toggleAuthMode}>
                      New User? Signup
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <button type="button" className="btn btn-link" onClick={toggleAuthMode}>
                      Already have an account? Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarLogin;
