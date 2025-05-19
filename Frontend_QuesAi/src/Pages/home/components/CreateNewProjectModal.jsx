import { useState } from "react";
import "./CreateNewProjectModal.css";

const CreateNewProjectModal = ({ onClose, onSubmit }) => {
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameInput = e.target["project-name"];
    const name = nameInput.value.trim();
    setError("");

    if (!name) {
      setError("Project name is required.");
      return;
    }

    onSubmit(name);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h2>Create Project</h2>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <label htmlFor="project-name">Project Name</label>
          <input
            type="text"
            id="project-name"
            name="project-name"
            placeholder="Type Here"
          />
          {error && <div className="error-message">{error}</div>}
          <div className="modal-actions">
            <button type="button" className="close-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewProjectModal;
