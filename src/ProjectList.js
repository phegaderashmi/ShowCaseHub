import React, { useState, useEffect } from "react";

const ProjectList = () => {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    console.log("Initial load from localStorage:", saved);
    return saved ? JSON.parse(saved) : [];
  });

  const [newLink, setNewLink] = useState("");

  useEffect(() => {
    console.log("Saving to localStorage:", projects);
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleAdd = () => {
    if (newLink.trim() === "") return;
    setProjects([...projects, newLink.trim()]);
    setNewLink("");
  };

  const handleRemove = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        wordBreak: "break-word",
      }}
    >
      <h2 className="text-center mb-4">🌐 My Hosted Projects</h2>

      <ul className="list-unstyled">
        {projects.map((link, index) => (
          <li
            key={index}
            className="d-flex justify-content-between align-items-center mb-2 bg-light p-2 rounded"
          >
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ flex: 1, color: "#007bff", textDecoration: "none" }}
            >
              {link}
            </a>
            <button
              className="btn btn-sm btn-danger ms-2"
              onClick={() => handleRemove(index)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <div className="d-flex flex-column flex-sm-row mt-4 gap-2">
        <input
          type="text"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
          placeholder="Enter project link"
          className="form-control"
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          ➕ Add
        </button>
      </div>
    </div>
  );
};

export default ProjectList;
