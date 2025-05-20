import { useState, useEffect } from "react";

const EditTranscript = ({ podcast, onBack, onSave }) => {
  const [transcript, setTranscript] = useState(podcast.podcastTranscript || "");
  const [originalTranscript, setOriginalTranscript] = useState(
    podcast.podcastTranscript || ""
  );

  useEffect(() => {
    setTranscript(podcast.podcastTranscript || "");
    setOriginalTranscript(podcast.podcastTranscript || "");
  }, [podcast]);

  const handleDiscard = () => {
    setTranscript(originalTranscript);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({ ...podcast, podcastTranscript: transcript });
    }
  };

  return (
    <div className="edit-transcript-container">
      <div className="edit-header">
        <div className="heading">
          <button className="back-btn" onClick={onBack}>
            ←
          </button>
          <h2>Edit Transcript</h2>
        </div>
        <div className="edit-actions">
          <button className="discard-btn" onClick={handleDiscard}>
            Discard
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>

      <div className="transcript-box">
        <h4 className="speaker-label">Speaker</h4>
        <textarea
          className="transcript-textarea"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default EditTranscript;
