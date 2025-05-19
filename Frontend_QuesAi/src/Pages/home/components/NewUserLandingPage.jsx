import "./NewUserLandingPage.css";
import landingPageImage from "../../../assets/images/create.svg";
import { PlusCircleIcon } from "lucide-react";

const NewUserLandingPage = ({ handleModal }) => {
  return (
    <div className="no-projects">
      <h1>Create a New Project</h1>
      <img src={landingPageImage} alt="LandingPageImage" />

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in
      </p>
      <button className="home-btn" onClick={handleModal}>
        <PlusCircleIcon/>
        Create Project
      </button>
    </div>
  );
};

export default NewUserLandingPage;
