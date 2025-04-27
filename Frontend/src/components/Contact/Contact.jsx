import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';
const Contact = () => {
  return (
    <>
    <Navbar />
    <div className="container mt-5">
      {/* Contact Details Section */}
      <section className="text-center mb-5">
        <p className="lead">We would love to hear from you! Reach out to us anytime.</p>

        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <div className="p-4 border rounded shadow-sm h-100">
              <i className="bi bi-geo-alt-fill mb-3" style={{ fontSize: "2rem", color: "#0d6efd" }}></i>
              <h5>Address</h5>
              <p>123 Tech Street, Silicon Valley, CA 94043</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-4 border rounded shadow-sm h-100">
              <i className="bi bi-telephone-fill mb-3" style={{ fontSize: "2rem", color: "#0d6efd" }}></i>
              <h5>Phone</h5>
              <p>+1 (800) 123-4567</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-4 border rounded shadow-sm h-100">
              <i className="bi bi-envelope-fill mb-3" style={{ fontSize: "2rem", color: "#0d6efd" }}></i>
              <h5>Email</h5>
              <p>support@videochat.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Need Help?</h2>
        <p className="text-center">
          Check out our <a href="#">FAQs</a> page or contact our 24/7 customer support team if you need any assistance with using VideoChat services.
        </p>
      </section>

      {/* Feedback Form */}
      <section className="mb-5">
        <h2 className="text-center mb-4">Send us your Feedback</h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form className="p-4 border rounded shadow-sm">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Your Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Your Message</label>
                <textarea className="form-control" id="message" rows="4" placeholder="Write your feedback..." required></textarea>
              </div>
              <Link to="/Login">
              <button type="submit" className="btn btn-primary w-100">Submit Feedback</button></Link>
            </form>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>

  );
};

export default Contact;
