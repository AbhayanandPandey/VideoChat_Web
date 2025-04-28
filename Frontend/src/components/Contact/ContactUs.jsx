// ContactUs.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/navbarlogin';
import Footer from '../Footer/footerlogin';
import 'bootstrap/dist/css/bootstrap.min.css';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const { name, email, message } = form;
        if (!name || !email || !message) {
            return alert('Please fill in all fields.');
        }

        // Get token from localStorage
        const token = localStorage.getItem('token1');
        if (!token) {
            return alert('You must be logged in to submit feedback.');
        }

        setLoading(true);
        const endpoint = '/api/auth/feedback';
        const payload = { name, email, message };

        try {
            await axios.post(endpoint, payload, {
                headers: {
                    Authorization: `Bearer ${token}`    // 👈 Fix: put inside headers object
                }
            });

            alert('Feedback submitted successfully!');
            setForm({ name: '', email: '', message: '' });
        } catch (err) {
            console.error('Feedback error:', err.response || err);
            alert(err.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">
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
                <section className="mb-5">
                    <h2 className="text-center mb-4">Send Us Your Feedback</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <form
                                className="p-4 border rounded shadow-sm"
                                onSubmit={handleSubmit}
                            >
                                <div className="mb-3">
                                    <label className="form-label">Your Name</label>
                                    <input
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter your name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Your Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Your Message</label>
                                    <textarea
                                        name="message"
                                        className="form-control"
                                        rows="4"
                                        placeholder="Write your feedback..."
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Submitting...' : 'Submit Feedback'}
                                </button>
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
