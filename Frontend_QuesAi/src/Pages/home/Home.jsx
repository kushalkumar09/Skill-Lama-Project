import "./Home.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import useFetchData from "../../hooks/useFetchData";
import { ProjectEndPoints } from "../../constants/endpoints";
import ProjectList from "./components/ProjectList.jsx";
import NewUserLandingPage from "./components/NewUserLandingPage.jsx";
import NavBar from "./components/NavBar.jsx";
import CreateNewProjectModal from "./components/CreateNewProjectModal.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [openCreateProject, setOpenCreateProject] = useState(false);
  const [projects, setProjects] = useState([]);
  const { GetAllProjects, CreateProject } = ProjectEndPoints;
  const { data, loading, error } = useFetchData(GetAllProjects.endPoint);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/userlogin");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (data) {
      setProjects(data.projects || []);
    }
  }, [data]);

  const handleCreateProject = async (projectName) => {
    try {
      const response = await fetch(CreateProject.endPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ projectName }),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const createdProject = await response.json();
      setProjects((prevProjects) => [createdProject.project, ...prevProjects]);
      setOpenCreateProject(false);
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Project creation failed. Please try again.");
    }
  };

  const handleModalToggle = () => {
    setOpenCreateProject((prev) => !prev);
  };

  return (
    <div className="home-container">
      <NavBar />

      <div className="home-content">
        {loading && <p>Loading projects...</p>}
        {error && <p className="error">Error: {error}</p>}

        {!loading && !error && projects.length > 0 ? (
          <ProjectList projects={projects} handleModal={handleModalToggle} />
        ) : (
          <NewUserLandingPage handleModal={handleModalToggle} />
        )}

        {openCreateProject && (
          <CreateNewProjectModal
            onClose={handleModalToggle}
            onSubmit={handleCreateProject}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
