import { Bell, HomeIcon, LogOut } from "lucide-react";
import { handleLogOut } from "../../../constants/utility";
import { Link } from "react-router";
const Topbar = ({ ProjectName }) => (
  <div className="topbar">
    <p>
      <span className="breadcrumb">
        <Link to="/"><HomeIcon size={14} strokeWidth={3}/>Home Page</Link> / {ProjectName} /
      </span>{" "}
      <strong>Add your podcast</strong>
    </p>
    <div className="icons">
      <button to="/podcast" className="icon">
        <Bell />
      </button>
      <button onClick={handleLogOut} className="icon">
        <LogOut color="red" />
      </button>
    </div>
  </div>
);

export default Topbar;
