import { ArrowLeft, AlertCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import "./UnknownRoutes.css"; // Import the CSS file

export const UnknownRoutes = () => {
  return (
    <div className="unknown-container">
      <div className="unknown-box">
        <div className="unknown-icon-wrapper">
          <div className="unknown-icon-circle">
            <AlertCircleIcon className="alert-icon" />
          </div>
          <div className="unknown-icon-badge">
            <div className="badge-text">404</div>
          </div>
        </div>

        <div className="unknown-message">
          <h1>Page not found</h1>
          <p className="sub-text">Sorry, we couldn't find the page you're looking for.</p>
        </div>

        <div className="unknown-actions">
          <p className="description">
            The page might have been moved, deleted, or perhaps you mistyped the URL.
          </p>

          <Link to="/" className="back-button">
            <ArrowLeft className="arrow-icon" />
            Back to homepage
          </Link>
        </div>

        <div className="support-text">
          <p>If you believe this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  );
};

export default UnknownRoutes;
