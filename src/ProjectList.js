import React, { useState, useEffect } from "react";

const ProjectList = () => {
  const [projects, setProjects] = useState(() => {
    // Load only once from localStorage safely
    const saved = localStorage.getItem("projects");
    console.log("Initial load from localStorage:", saved);
    return saved ? JSON.parse(saved) : [];
  });

  const [newLink, setNewLink] = useState("");

  // Save to localStorage whenever projects change
  useEffect(() => {
    console.log("Saving to localStorage:", projects);
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleAdd = () => {
    if (newLink.trim() === "") return;

    const updated = [...projects, newLink.trim()];
    setProjects(updated);
    setNewLink("");
  };

  const handleRemove = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🌐 My Hosted Projects</h2>

      <ul>
        {projects.map((link, index) => (
          <li key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
            <button
              onClick={() => handleRemove(index)}
              style={{ marginLeft: "10px" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={newLink}
        onChange={(e) => setNewLink(e.target.value)}
        placeholder="Enter project link"
        style={{ marginRight: "10px", padding: "6px", width: "300px" }}
      />
      <button onClick={handleAdd}>➕ Add</button>
    </div>
  );
};

export default ProjectList;
