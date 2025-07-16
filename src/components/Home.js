import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-dark text-white d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url("home.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      ></div>

      {/* Top-right message */}
      <div
        className="position-absolute top-0 end-0 m-4 px-4 py-2 text-white fw-bold shadow"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(6px)",
          borderRadius: "12px",
          fontSize: "1.1rem",
          textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          zIndex: 2,
        }}
      >
        ✨ Welcome to my <span style={{ color: "#0dcaf0" }}>Showcase</span>! ✨
      </div>

      {/* Main Content */}

      <div
        className="position-relative z-2 d-flex justify-content-center align-items-center h-100 w-100"
        style={{ paddingLeft: "550px" }}
      >
        <div style={{ textAlign: "left" }}>
          <h1
            className="display-4 mb-3"
            style={{
              textShadow:
                "2px 2px 4px rgba(0, 0, 0, 0.6), 4px 4px 8px rgba(0, 0, 0, 0.4)",
              fontWeight: "bold",
            }}
          >
            Unleash with ShowcaseHub
          </h1>

          <p
            className="lead mb-4"
            style={{
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
              fontWeight: "500",
              paddingLeft: "250px",
            }}
          >
            Choose what you want to do:
          </p>

          <div
            className="d-flex gap-3 flex-wrap"
            style={{ paddingLeft: "150px" }}
          >
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
  );
};

export default Home;
