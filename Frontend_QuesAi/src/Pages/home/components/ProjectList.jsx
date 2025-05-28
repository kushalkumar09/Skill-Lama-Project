import { PlusCircleIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import "./ProjectList.css";
import { useNavigate } from "react-router";

const ProjectList = ({ projects, handleModal }) => {
  const navigate = useNavigate();

  const handleProjectClick = (project) => {
    console.log("Clicked project:", project); 
    navigate(`/projects/${project._id}/upload`, {
      state: { projectName: project.projectName },
    });
  };
  if (!projects) {
    return (
      <div className="no-projects">
        <h1>No Projects Available</h1>
        <p>Please create a new project to get started.</p>
        <button className="home-btn" onClick={handleModal}>
          <PlusCircleIcon />
          Create Project
        </button>
      </div>
    );
  }

  let recentProjects = projects.sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
  console.log("Projects:", projects);
  return (
    <div className="projects-container">
      <div className="projects-header">
        <h2 className="projects-title">Projects</h2>
        <button className="create-project-btn" onClick={handleModal}>
          <PlusCircleIcon size={18} />
          Create New Project
        </button>
      </div>

      <ul className="projects-list">
        {recentProjects.map((project) => (
          <li
            key={project._id}
            className="project-card"
            onClick={() => handleProjectClick(project)}
          >
            <div className="project-avatar">
              {project.projectName.slice(0, 2).toUpperCase()}
            </div>
            <div className="project-info">
              <h3 className="project-name">{project.projectName}</h3>
              <p>{project.podcastLinks?.length || 0} Files</p>
              <span className="project-updated">
                Last edited {formatDistanceToNow(new Date(project.updatedAt))}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
