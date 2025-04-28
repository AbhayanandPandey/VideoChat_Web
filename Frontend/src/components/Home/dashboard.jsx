import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/navbarlogin";
import Footer from "../Footer/footer";
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token1");
    navigate("/");
  };
  useEffect(() => {
    const token = localStorage.getItem("token1");
    if (!token) return navigate("/login");

    fetch("/api/auth/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setUser(data.user))
      .catch(() => navigate("/login"));
  }, [navigate]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set timeout for 1 second
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer); // Clean up
  }, []);

  if (loading || !user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" style={{ width: "4rem", height: "4rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading, please wait...</p>
        </div>
      </div>
    );
  }
  

  return (
    <>
    <Navbar />
    
    <div className="bg-gradient min-vh-100 d-flex flex-column justify-content-center align-items-center p-3">
      <div
        className="card shadow-lg border-0 rounded-4 overflow-hidden w-100"
        style={{ maxWidth: "850px" }}
      >
        {/* Header */}
        <div
          className="p-5 text-white"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <div className="d-flex align-items-center">
            <i className="bi bi-speedometer2 fs-1 me-3"></i>
            <div>
              <h1 className="h3 mb-1">Dashboard</h1>
              <p className="mb-0 text-light small">Welcome back!</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="card-body p-4">
          <div className="d-flex flex-column flex-md-row align-items-center mb-4">
            <div className="avatar bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-md-4 mb-3 mb-md-0" style={{ width: "80px", height: "80px", fontSize: "2rem" }}>
              <i className="bi bi-person-circle"></i>
            </div>
            <div className="text-center text-md-start">
              <h2 className="h4 mb-1">{user.username}</h2>
              <p className="text-muted mb-0">{user.email}</p>
            </div>
          </div>

          {/* Add more sections here */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6">
              <div className="p-3 bg-light rounded shadow-sm">
                <h5 className="mb-2">Your Meetings</h5>
                <p className="mb-0 text-muted">No recent meetings yet.</p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="p-3 bg-light rounded shadow-sm">
                <h5 className="mb-2">Statistics</h5>
                <p className="mb-0 text-muted">Coming soon...</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="text-center">
            <button 
              className="btn btn-outline-danger w-100 py-2 rounded-3"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
