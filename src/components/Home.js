import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-dark text-white d-flex flex-column justify-content-center align-items-center vh-100 position-relative"
      style={{
        backgroundImage: `url("home.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1 }}
      ></div>

      {/* Top-right message */}
      <div
        className="position-absolute top-0 end-0 m-3 px-3 py-2 text-white fw-bold shadow"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(6px)",
          borderRadius: "12px",
          fontSize: "1rem",
          textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          zIndex: 2,
        }}
      >
        ✨ Welcome to my <span style={{ color: "#0dcaf0" }}>Showcase</span>! ✨
      </div>

      {/* Main Content */}
      <div className="container position-relative z-2">
        <div className="row justify-content-center text-center text-md-start">
          <div className="col-12 col-md-10 col-lg-8">
            <h1
              className="display-5 fw-bold mb-3"
              style={{
                textShadow:
                  "2px 2px 4px rgba(0, 0, 0, 0.6), 4px 4px 8px rgba(0, 0, 0, 0.4)",
              }}
            >
              Unleash with ShowcaseHub
            </h1>

            <p
              className="lead mb-4"
              style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)" }}
            >
              Choose what you want to do:
            </p>

            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-start gap-3">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => navigate("/add")}
              >
                ➕ Add New Showcase
              </button>
              <button
                className="btn btn-outline-light btn-lg"
                onClick={() => navigate("/list")}
              >
                📂 List of Showcases
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
