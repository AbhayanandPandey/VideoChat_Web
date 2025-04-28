import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navbar/navbarlogin';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import Footer from '../Footer/footerlogin';
import { Link } from 'react-router-dom';
const About = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Welcome to VideoChat</h1>
        <p className="lead text-muted">
          The complete solution for video conferencing, messaging, collaboration, and more — all in one platform!
        </p>
      </div>

      {/* Features */}
      <div className="row g-4">
        {/* Main Features */}
        {[
          {
            icon: "bi-camera-video-fill",
            title: "HD Video Conferencing",
            desc: "Crystal-clear video calls with dynamic speaker view and grid layouts."
          },
          {
            icon: "bi-chat-dots-fill",
            title: "Real-time Chat",
            desc: "Instant messaging during meetings with emoji support and file links."
          },
          {
            icon: "bi-display-fill",
            title: "Screen Sharing",
            desc: "Share your screen or a specific window to collaborate effectively."
          },
          {
            icon: "bi-shield-lock-fill",
            title: "End-to-End Encryption",
            desc: "Security first — your data is protected with enterprise-grade encryption."
          },
          {
            icon: "bi-people-fill",
            title: "Breakout Rooms",
            desc: "Split meetings into smaller groups automatically or manually."
          },
          {
            icon: "bi-cloud-arrow-up-fill",
            title: "File Sharing",
            desc: "Easily share important documents, PDFs, images and more during meetings."
          },
          {
            icon: "bi-calendar-event-fill",
            title: "Meeting Scheduler",
            desc: "Schedule, organize, and send calendar invites with meeting links."
          },
          
          {
            icon: "bi-image-fill",
            title: "Background Blur & Virtual Backgrounds",
            desc: "Focus on yourself by blurring or changing your background easily."
          },
          {
            icon: "bi-pen-fill",
            title: "Multi-user Collaboration",
            desc: "Collaborative whiteboard, shared notes, and simultaneous screen control."
          }
        ].map((feature, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm text-center p-4">
              <i className={`bi ${feature.icon} fs-1 text-primary mb-3`}></i>
              <h5 className="fw-bold">{feature.title}</h5>
              <p className="text-muted">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* About More */}
      <div className="mt-5 text-center">
        <h2 className="fw-bold">Built for Everyone</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
          Whether you're working remotely, attending online classes, hosting webinars, or connecting with loved ones — 
          VideoChat is designed to deliver a seamless and powerful communication experience.
        </p>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-5">
        <h4 className="fw-bold">Ready to get started?</h4>
        <p className="text-muted">Create your first meeting today — it's free and easy!</p>
        <Link to="/Room" className="btn btn-primary btn-lg mt-2">Join Now</Link>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default About;
