import { useState } from "react";
import { X } from "lucide-react";
import YouTubeIcon from "../../../../assets/images/youtubeIcon.svg";
import "./YoutubeUploadModal.css";

const YoutubeUploadModal = ({onClose, onUpload }) => {
  const [name, setName] = useState("");
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  const handleUpload = () => {
    if (!name.trim() || !transcript.trim()) {
      setError("Both fields are required.");
      return;
    }

    const formData = {
      name: name.trim(),
      transcript: transcript.trim(),
    };

    onUpload(formData);
    setName("");
    setTranscript("");
    setError("");
    onClose(); 
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">
            <img src={YouTubeIcon} alt="YouTube" className="youtube-icon" />
            <h2>Upload from Youtube</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <label>Name</label>
          <input
            type="text"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter video name"
          />

          <label>Transcript</label>
          <textarea
            className="textarea-field"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste transcript here"
            rows={6}
          />

          {error && <p className="error-text">{error}</p>}

          <button className="upload-btn" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default YoutubeUploadModal;
