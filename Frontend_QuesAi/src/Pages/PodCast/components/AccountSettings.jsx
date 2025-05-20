
import { UserCircle2Icon, UserSquare2Icon } from "lucide-react";
import "../styles/accountsetting.css"
const AccountSettings = ({onBack,userInfo}) => {
  return (
    <div className="account-settings">
      <div className="heading">
          <button className="back-btn" onClick={onBack}>
            ←
          </button>
          <h2>Account Setting</h2>
        </div>

      <div className="profile-section">
        <UserCircle2Icon size={48}/>
        <div className="input-group">
          <div className="input-field">
            <label>UserName</label>
            <input type="text" value={userInfo?.username ?? "User Name"} readOnly />
          </div>
          <div className="input-field">
            <label>Email</label>
            <input type="text" value={userInfo?.email ?? "useremail@gmail.com"} readOnly />
          </div>
        </div>
      </div>

      <h3 className="sub-heading">Subscriptions</h3>
      <div className="subscription-box">
        <p>
          Oops! You don’t have any active plans.{" "}
          <span className="highlight">Upgrade now!</span>
        </p>
        <button className="upgrade-btn">Upgrade</button>
      </div>
    </div>
  );
};

export default AccountSettings;
