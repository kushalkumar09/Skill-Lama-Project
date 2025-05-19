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
import { useEffect, useState } from "react";
import { AuthEndPoints } from "../../../constants/endpoints";

const Sidebar = () => {
  const [userInfo, setUserInfo] = useState(null);

  const { endPoint, method } = AuthEndPoints.GetUserDetails;

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(endPoint, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        const data = await response.json();
        setUserInfo(data.user);
      } catch (error) {
        console.error("Error fetching user info:", error);
        alert("Failed to fetch user info. Please try again.");
      }
    };
    getUserInfo();
  }, []);

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
      <div className="user-info">
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
