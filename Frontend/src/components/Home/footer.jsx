import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; 
const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-3">
            <h5>About Us</h5>
            <p>
              We are a leading company providing exceptional services in various
              fields. Our mission is to deliver the best customer experience
              through innovative solutions.
            </p>
          </div>

          <div className="col-md-3 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/about" className="text-white">About</a></li>
              <li><a href="/services" className="text-white">Services</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </div>

          <div className="col-md-3 mb-3">
            <h5>Contact Info</h5>
            <p>Phone: +123 456 789</p>
            <p>Email: info@company.com</p>
          </div>

          <div className="col-md-3 mb-3">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white me-3">
                  <FaFacebook /> Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-white me-3">
                  <FaTwitter /> Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-white me-3">
                  <FaInstagram /> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="text-white" />

        <div className="text-center">
          <p>&copy;2025 Shoping_zone. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;