import { Bell, LogOut } from "lucide-react";
import { handleLogOut } from "../../../constants/utility";
const Topbar = ({ProjectName}) => (
  <div className="topbar">
    <p>
      <span className="breadcrumb">Home Page / {ProjectName} /</span>{" "}
      <strong>Add your podcast</strong>
    </p>
    <div className="icons">
      <button to="/podcast" className="icon">
        <Bell />
      </button>
      <button onClick={handleLogOut} className="icon">
        <LogOut color="red"/>
      </button>
    </div>
  </div>
);

export default Topbar;
