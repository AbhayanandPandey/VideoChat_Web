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
    
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div
          className="card shadow-lg rounded-lg overflow-hidden mx-auto"
          style={{ maxWidth: "800px" }}
        >
          {/* Header with gradient */}
          <div
            className="p-4 d-flex align-items-center text-white"
            style={{
              background:
                "linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%)",
            }}
          >
            <i className="bi bi-speedometer2 fs-2 me-3"></i>
            <h1 className="mb-0">Dashboard</h1>
          </div>

          {/* Body */}
          <div className="card-body">
            <div className="d-flex align-items-center mb-4">
              <i className="bi bi-person-circle text-primary fs-1 me-3"></i>
              <div>
                <h3 className="mb-1">Welcome, {user.username}</h3>
                <p className="mb-0 text-muted">{user.email}</p>
              </div>
            </div>

            {/* You can add more sections here: stats, recent activity, etc. */}
          </div>
            <button className="btn btn-danger" onClick={() => {
              localStorage.removeItem("token1");
              navigate("/");
            }}>
              Logout    
              </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
