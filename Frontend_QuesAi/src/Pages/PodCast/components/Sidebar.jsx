import {
  CopyIcon,
  Diamond,
  PencilIcon,
  Plus,
  SettingsIcon,
  UserSquareIcon,
} from "lucide-react";
import logo from "../../../assets/images/logo.svg";
import "../styles/styles.css";

const Sidebar = ({openUserSetting,userInfo}) => { 

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="Ques.AI Logo" />
      </div>

      <ul className="nav-links">
        <li className="active">
          <Plus size={16} style={{ marginRight: "8px" }} />
          Add your Podcast(s)
        </li>
        <li>
          <PencilIcon size={16} style={{ marginRight: "8px" }} />
          Create & Repurpose
        </li>
        <li>
          <CopyIcon size={16} style={{ marginRight: "8px" }} />
          Podcast Widget
        </li>
        <li>
          <Diamond size={16} style={{ marginRight: "8px" }} />
          Upgrade
        </li>
      </ul>
      <hr />
      <div className="settings">
        <SettingsIcon size={14} /> <span>Help</span>
      </div>
      <hr />
      <div className="user-info" onClick={openUserSetting}>
        <UserSquareIcon size={40} />
        <div className="user-details">
          <p>{userInfo?.username ?? "User Name"}</p>
          <span>{userInfo?.email ?? "useremail@gmail.com"}</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
