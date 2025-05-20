import { useState } from "react";
import { formatDateTime } from "../../../constants/utility";

const FileList = ({ episodes = [], onView, onDelete,projectId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(episodes.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = episodes.slice(startIdx, startIdx + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="file-list">
      <div className="container">
        <h2>Your Files</h2>

        {episodes.length === 0 ? (
          <div className="no-files">
            <p>No files available. Please upload a file.</p>
          </div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Upload Date & Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((file, index) => (
                  <tr key={index}>
                    <td>{startIdx + index + 1}</td>
                    <td>{file.podcastName}</td>
                    <td>{formatDateTime(file.updatedAt)}</td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => onView(file,projectId,file._id)}
                      >
                        View
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => onDelete(file)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination-controls">
              <button onClick={handlePrev} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FileList;
