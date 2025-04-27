import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navbar/navbarlogin';
import Footer from '../Footer/footerlogin';

const About = () => {
  return (
    <>
    <Navbar />
    <div className="container mt-5">
      <section className="text-center mb-5">
        <h1 className="mb-4">About VideoChat</h1>
        <p className="lead">
          VideoChat is your ultimate solution for real-time communication. Whether you're hosting business meetings, online classes, or connecting with friends and family, we offer a secure, high-quality platform for video conferencing and collaboration.
        </p>
      </section>

      <section className="row align-items-center mb-5">
        <div className="col-md-6">
          <img 
            src="https://img.freepik.com/free-vector/video-conference-concept-illustration_114360-4766.jpg"
            alt="Video Chat Illustration"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h3 className="mb-3">Our Mission</h3>
          <p>
            To simplify communication across the world by providing an intuitive, reliable, and secure video conferencing experience. We focus on innovation, user-friendliness, and accessibility, so that connecting with others becomes effortless.
          </p>
        </div>
      </section>

      <section className="row text-center">
        <div className="col-md-4 mb-4">
          <div className="p-4 border rounded shadow-sm h-100">
            <i className="bi bi-lightning-charge-fill mb-3" style={{ fontSize: "2rem", color: "#0d6efd" }}></i>
            <h5>Fast & Reliable</h5>
            <p>Experience minimal latency and crystal-clear audio/video quality even on slower networks.</p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="p-4 border rounded shadow-sm h-100">
            <i className="bi bi-shield-check mb-3" style={{ fontSize: "2rem", color: "#0d6efd" }}></i>
            <h5>Secure by Design</h5>
            <p>With end-to-end encryption and secure servers, your data and privacy are always protected.</p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="p-4 border rounded shadow-sm h-100">
            <i className="bi bi-people-fill mb-3" style={{ fontSize: "2rem", color: "#0d6efd" }}></i>
            <h5>User Friendly</h5>
            <p>Simple, clean interfaces make it easy for anyone to host or join meetings without tech struggles.</p>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>

  );
};

export default About;
