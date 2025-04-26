import 'animate.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Main = () => {
  return (
    <>
      <main className="container my-5">

        {/* Hero Section */}
        <section className="text-center mb-5">
          <h1 className="fw-bold text-primary mb-4 animate__animated animate__fadeInDown">
            Welcome to VideoChat
          </h1>
          <p className="fs-5 text-secondary animate__animated animate__fadeInUp">
            Connect with your friends, family, and team members instantly with
            high-quality video and audio. Our platform makes it easy to start
            secure and seamless video meetings — from anywhere in the world.
          </p>

          {/* Start VideoChat Button */}
          <div className="mt-4">
            <a href="/start" className="btn btn-lg btn-primary px-5 py-3 shadow animate__animated animate__zoomIn">
              🚀 Start VideoChat
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="row mt-5">
          <div className="col-md-4 text-center mb-4 animate__animated animate__fadeInUp">
            <img
              src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
              alt="Easy Setup"
              className="img-fluid mb-3"
              width="80"
            />
            <h3 className="fw-semibold">Easy Setup</h3>
            <p className="text-muted">
              Create or join meetings instantly without downloads. Just one
              click away.
            </p>
          </div>

          <div className="col-md-4 text-center mb-4 animate__animated animate__fadeInUp animate__delay-1s">
            <img
              src="https://cdn-icons-png.flaticon.com/512/189/189665.png"
              alt="Secure Connection"
              className="img-fluid mb-3"
              width="80"
            />
            <h3 className="fw-semibold">Secure Connection</h3>
            <p className="text-muted">
              All video calls are encrypted and secure to ensure your privacy.
            </p>
          </div>

          <div className="col-md-4 text-center mb-4 animate__animated animate__fadeInUp animate__delay-2s">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5698/5698995.png"
              alt="High Quality"
              className="img-fluid mb-3"
              width="80"
            />
            <h3 className="fw-semibold">High Quality</h3>
            <p className="text-muted">
              Experience smooth video streaming even with low bandwidth
              networks.
            </p>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mt-5">
          <h2 className="text-center fw-bold mb-4 text-primary animate__animated animate__fadeIn">
            Why Choose VideoChat?
          </h2>
          <div className="row">
            <div className="col-md-6 mb-4 animate__animated animate__fadeInLeft">
              <div className="p-4 shadow rounded bg-light">
                <h4>💬 Real-Time Messaging</h4>
                <p className="text-muted">
                  Instantly message participants during the call with our built-in chat feature.
                </p>
              </div>
            </div>
            <div className="col-md-6 mb-4 animate__animated animate__fadeInRight">
              <div className="p-4 shadow rounded bg-light">
                <h4>📱 Mobile Friendly</h4>
                <p className="text-muted">
                  Join meetings from your phone, tablet, or desktop — no app installation needed.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default Main;
