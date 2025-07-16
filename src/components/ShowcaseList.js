import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ShowcaseList = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("website");
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("projects");
    if (stored) {
      setProjects(JSON.parse(stored));
    }
  }, []);

  const handleRemove = (id) => {
    const updated = projects.filter((proj) => proj.id !== id);
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
  };

  const handleEdit = (project) => {
    navigate("/add", { state: { projectToEdit: project } });
  };

  const filteredProjects = projects.filter((proj) => proj.type === filterType);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const paginatedProjects = filteredProjects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-vh-100 bg-dark text-white py-5">
      <div className="container">
        <h2 className="text-center mb-4 text-info">📋 My Project Showcases</h2>

        {/* Bootstrap Toggle Button Group */}
        <div className="d-flex justify-content-center mb-4">
          <div className="btn-group" role="group" aria-label="Toggle View">
            <input
              type="radio"
              className="btn-check"
              name="projectType"
              id="websiteBtn"
              autoComplete="off"
              checked={filterType === "website"}
              onChange={() => {
                setFilterType("website");
                setCurrentPage(1);
              }}
            />
            <label className="btn btn-outline-primary" htmlFor="websiteBtn">
              Website Projects
            </label>

            <input
              type="radio"
              className="btn-check"
              name="projectType"
              id="certificateBtn"
              autoComplete="off"
              checked={filterType === "certificate"}
              onChange={() => {
                setFilterType("certificate");
                setCurrentPage(1);
              }}
            />
            <label className="btn btn-outline-success" htmlFor="certificateBtn">
              Certificate Projects
            </label>
          </div>
        </div>

        <h5 className="text-muted text-center mb-3">
          Currently Showing:{" "}
          {filterType.charAt(0).toUpperCase() + filterType.slice(1)} Projects
        </h5>

        {filteredProjects.length === 0 ? (
          <p className="text-center">No projects found. Please add one!</p>
        ) : (
          <>
            <div className="table-responsive">
              <table
                className="table table-bordered table-hover table-dark text-white w-100"
                style={{ tableLayout: "auto" }}
              >
                <thead className="table-info text-dark">
                  <tr>
                    <th style={{ width: "5%" }}>Sr. No</th>
                    <th style={{ width: "20%" }}>Project Name</th>
                    <th style={{ width: "20%" }}>Project Link</th>
                    <th style={{ width: "40%" }}>Description</th>
                    <th style={{ width: "15%" }}>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedProjects.map((proj, index) => (
                    <tr key={proj.id}>
                      <td>{indexOfFirst + index + 1}</td>
                      <td>{proj.name}</td>
                      <td>
                        <a
                          href={proj.link}
                          target="_self"
                          rel="noopener noreferrer"
                          className="text-info fw-bold"
                        >
                          Visit
                        </a>
                      </td>
                      <td style={{ whiteSpace: "pre-wrap" }}>
                        {proj.description}
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <button
                            onClick={() => handleEdit(proj)}
                            className="btn btn-warning btn-md px-3 py-2 d-flex align-items-center justify-content-center"
                            style={{ fontSize: "1.2rem" }}
                            title="Edit Project"
                          >
                            <FaEdit />
                          </button>

                          <button
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#d33",
                                cancelButtonColor: "#3085d6",
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  handleRemove(proj.id);
                                  Swal.fire(
                                    "Deleted!",
                                    "Your project has been deleted.",
                                    "success"
                                  );
                                }
                              });
                            }}
                            className="btn btn-danger btn-md px-3 py-2 d-flex align-items-center justify-content-center"
                            style={{ fontSize: "1.2rem" }}
                            title="Delete Project"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <nav className="mt-4 d-flex justify-content-center">
              <ul className="pagination pagination-sm">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    <button className="page-link">{i + 1}</button>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default ShowcaseList;
