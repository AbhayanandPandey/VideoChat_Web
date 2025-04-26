import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "animate.css";
import { Link } from "react-router-dom";
const Main = () => {
  useEffect(() => {
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      counter.innerText = "0";
      const update = () => {
        const target = +counter.dataset.target;
        const current = +counter.innerText;
        const increment = target / 200;
        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(update, 10);
        } else {
          counter.innerText = target;
        }
      };
      update();
    });
  }, []);

  return (
    <main className="container my-5">
      {/* Hero */}
      <section
        className="text-center d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "33vh" }}
      >
        <h1 className="fw-bold text-primary mb-4 animate__animated animate__fadeInDown">
          Welcome to <span className="text-success">VideoChat</span>
        </h1>
        <p className="fs-5 text-secondary animate__animated animate__fadeInUp">
          Connect instantly with friends, family, and colleagues. High-quality,
          secure video & audio—anywhere.
        </p>
        <Link
          to="/Login"
          className="btn btn-lg btn-primary px-5 py-3 shadow animate__animated animate__zoomIn mt-3"
        >
          🚀 Start VideoChat
        </Link>
      </section>

      {/* Features */}
      <section
        className="row text-center d-flex justify-content-center align-items-center"
        style={{ minHeight: "33vh" }}
      >
        {[
          {
            img: "https://img.icons8.com/fluency/96/easy.png",
            title: "Easy Setup",
            text: "Join meetings without downloads—one click to connect.",
          },
          {
            img: "https://img.icons8.com/color/96/security-checked.png",
            title: "Secure",
            text: "End-to-end encryption keeps your calls private.",
          },
          {
            img: "	https://img.icons8.com/color/96/video-call.png",
            title: "High Quality",
            text: "Smooth video streaming on all network conditions.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className={`col-md-4 mb-4 animate__animated animate__fadeInUp animate__delay-${i}s`}
          >
            <img
              src={f.img}
              alt={f.title}
              className="img-fluid mb-3"
              width="80"
            />
            <h3 className="fw-semibold">{f.title}</h3>
            <p className="text-muted">{f.text}</p>
          </div>
        ))}
      </section>
      {/* Counters */}
      <section
        className="row text-center d-flex justify-content-center align-items-center"
        style={{ minHeight: "33vh" }}
      >
        {[
          { target: 5000, label: "Users Worldwide" },
          { target: 12000, label: "Meetings Held" },
          { target: 80, label: "Countries Served" },
        ].map((c, i) => (
          <div
            key={i}
            className={`col-md-4 mb-4 animate__animated animate__zoomIn animate__delay-${i}s`}
          >
            <h2
              className="counter display-4 text-primary"
              data-target={c.target}
            ></h2>
            <p className="fs-5 text-secondary">{c.label}</p>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section
        className="mb-5 d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "33vh" }}
      >
        <h2 className="text-center fw-bold mb-4 animate__animated animate__fadeIn">
          What People Say
        </h2>
        <div className="row">
          {[
            {
              quote: "VideoChat made remote meetings feel personal again!",
              name: "Alice",
            },
            { quote: "The encryption gives me peace of mind.", name: "Bob" },
            { quote: "Best platform for family catchups!", name: "Cara" },
          ].map((t, i) => (
            <div
              key={i}
              className={`col-md-4 mb-4 animate__animated animate__fadeInUp animate__delay-${i}s`}
            >
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <p className="card-text fst-italic">“{t.quote}”</p>
                  <h6 className="card-subtitle text-end">— {t.name}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="mb-5 d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "33vh" }}
      >
        <h2 className="text-center fw-bold mb-4 text-primary animate__animated animate__fadeIn">
          Why Choose VideoChat?
        </h2>
        <div className="row w-100">
          <div className="col-md-6 mb-4 animate__animated animate__fadeInLeft w">
            <div className="p-4 shadow rounded bg-light">
              <h4>💬 Real-Time Chat</h4>
              <p className="text-muted">
                Message participants instantly without leaving the call.
              </p>
            </div>
          </div>
          <div className="col-md-6 mb-4 animate__animated animate__fadeInRight">
            <div className="p-4 shadow rounded bg-light">
              <h4>📱 Cross-Platform</h4>
              <p className="text-muted">
                Works on desktop, mobile, and tablet—no installation needed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
