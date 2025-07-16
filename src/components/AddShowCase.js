import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const AddShowcase = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const projectToEdit = location.state?.projectToEdit || null;

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    name: "",
    link: "",
    description: "",
    type: "website", // default type
  });

  useEffect(() => {
    if (projectToEdit) {
      setForm({
        name: projectToEdit.name,
        link: projectToEdit.link,
        description: projectToEdit.description,
        type: projectToEdit.type || "website",
      });
    }
  }, [projectToEdit]);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (!form.name || !form.link || !form.description || !form.type) return;

    let updatedProjects = [...projects];

    if (projectToEdit) {
      updatedProjects = updatedProjects.map((proj) =>
        proj.id === projectToEdit.id ? { ...form, id: projectToEdit.id } : proj
      );
    } else {
      updatedProjects.push({ ...form, id: Date.now() });
    }

    setProjects(updatedProjects);

    Swal.fire({
      icon: "success",
      title: projectToEdit ? "Project Updated!" : "Project Added!",
      showConfirmButton: false,
      timer: 1500,
    });

    setForm({ name: "", link: "", description: "", type: "website" });
    navigate("/list");
  };

  return (
    <div
      className="min-vh-100 text-white py-5"
      style={{
        backgroundImage: `url("/addform.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", zIndex: 0 }}
      ></div>

      <div className="container position-relative z-1">
        <h2 className="text-center mb-5">
          {projectToEdit ? "✏️ Update Project" : "🌐 Add New Project"}
        </h2>

        <div
          className="mx-auto mb-5 p-4"
          style={{
            maxWidth: "650px",
            background:
              "linear-gradient(to right, rgba(40,40,40,0.8), rgba(20,20,20,0.9))",
            borderRadius: "20px",
            boxShadow: "0 0 30px rgba(0, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            zIndex: 2,
          }}
        >
          <h3 className="text-center mb-4 text-info fw-bold">
            Showcase Your Creation
          </h3>

          {/* Type Toggle */}
          <div className="mb-4">
            <label className="form-label text-light fw-bold fs-5">
              Select Project Type
            </label>
            <div
              className="btn-group w-100"
              role="group"
              aria-label="Project type toggle"
            >
              <input
                type="radio"
                className="btn-check"
                name="type"
                id="website"
                value="website"
                checked={form.type === "website"}
                onChange={handleChange}
              />
              <label className="btn btn-outline-info" htmlFor="website">
                Website
              </label>

              <input
                type="radio"
                className="btn-check"
                name="type"
                id="certificate"
                value="certificate"
                checked={form.type === "certificate"}
                onChange={handleChange}
              />
              <label className="btn btn-outline-success" htmlFor="certificate">
                Certificate
              </label>
            </div>
          </div>

          {/* Name Input */}
          <div className="mb-3">
            <label className="form-label text-light fw-bold fs-5">
              Project Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter project name"
              className="form-control rounded-pill px-4 py-3 border-0"
              style={{
                backgroundColor: form.name ? "#ffffff" : "#2e2e2e",
                color: form.name ? "#000000" : "#ffffff",
                boxShadow: "inset 0 0 5px rgba(0,255,255,0.3)",
                transition: "background-color 0.3s ease, color 0.3s ease",
              }}
            />
          </div>

          {/* Link Input */}
          <div className="mb-3">
            <label className="form-label text-light fw-bold fs-5">
              Project Link
            </label>
            <input
              type="text"
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="https://your-project.com"
              className="form-control rounded-pill px-4 py-3 border-0"
              style={{
                backgroundColor: form.link ? "#ffffff" : "#2e2e2e",
                color: form.link ? "#000000" : "#ffffff",
                boxShadow: "inset 0 0 5px rgba(0,255,255,0.3)",
                transition: "background-color 0.3s ease, color 0.3s ease",
              }}
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="form-label text-light fw-bold fs-5">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="What does this project do?"
              rows={4}
              className="form-control rounded px-4 py-3 border-0"
              style={{
                backgroundColor: form.description ? "#ffffff" : "#2e2e2e",
                color: form.description ? "#000000" : "#ffffff",
                boxShadow: "inset 0 0 5px rgba(0,255,255,0.2)",
                transition: "background-color 0.3s ease, color 0.3s ease",
              }}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleAddOrUpdate}
            className="btn w-100 py-3 fw-bold text-white"
            style={{
              background: "linear-gradient(to right, #00c6ff, #0072ff)",
              border: "none",
              borderRadius: "50px",
              boxShadow: "0 4px 15px rgba(0, 114, 255, 0.4)",
              transition: "0.3s",
            }}
          >
            {projectToEdit ? "Update Project" : " Add Project"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddShowcase;
