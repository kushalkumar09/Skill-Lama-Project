const Project = require("../../model/projects.model");

const createNewProject = async (req, res) => {
  try {
    const { projectName } = req.body;
    console.log(req.user);
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized User to create project" });
    }

    if (!projectName) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const trimmedProjectName = projectName.trim();

    const existingProject = await Project.findOne({
      projectName: trimmedProjectName,
      createdBy: req.user.id,
    });

    if (existingProject) {
      return res
        .status(409)
        .json({ message: "You already have a project with this name" });
    }

    const newProject = new Project({
      projectName: trimmedProjectName,
      createdBy: req.user.id,
      podcastLinks: [],
    });

    const savedProject = await newProject.save();

    return res.status(201).json({
      message: "Project created successfully",
      project: savedProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const uploadPodcast = async (req, res) => {
  try {
    const { podcastName, podcastTranscript } = req.body;
    console.log(podcastName, podcastTranscript);

    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "User not authorized to upload podcast" });
    }

    if (!podcastName || !podcastTranscript) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const projectId = req.params.projectId;
    const project = await Project.findOne({
      _id: projectId,
      createdBy: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // check if a podcast with the same name already exists
    const alreadyExists = project.podcastLinks.some(
      (podcast) =>
        podcast.podcastName.trim().toLowerCase() ===
        podcastName.trim().toLowerCase()
    );

    if (alreadyExists) {
      return res
        .status(409)
        .json({
          message: "Podcast with this name already exists in the project",
        });
    }

    project.podcastLinks.push({
      podcastName: podcastName.trim(),
      podcastTranscript: podcastTranscript.trim(),
    });

    // updating Project
    const updatedProject = await project.save();

    return res.status(200).json({
      message: "Podcast uploaded successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error uploading podcast:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const deletePodcast = async (req, res) => {
  try {
    const { projectId, podcastId } = req.params;

    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "User not authorized to delete podcast" });
    }

    if (!podcastId) {
      return res.status(400).json({ message: "Podcast ID is required" });
    }

    const project = await Project.findOne({
      _id: projectId,
      createdBy: req.user.id,
    });

    if (!project) {
      return res
        .status(404)
        .json({ message: "Project not found or unauthorized" });
    }

    const initialLength = project.podcastLinks.length;

    project.podcastLinks = project.podcastLinks.filter(
      (podcast) => podcast._id.toString() !== podcastId
    );

    if (project.podcastLinks.length === initialLength) {
      return res
        .status(404)
        .json({ message: "Podcast not found in the project" });
    }

    const updatedProject = await project.save();

    return res.status(200).json({
      message: "Podcast deleted successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error deleting podcast:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const updatePodcast = async (req, res) => {
  try {
    const { projectId, podcastId } = req.params;
    const { podcastTranscript } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    if (!podcastTranscript) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const project = await Project.findOne({
      _id: projectId,
      createdBy: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const podcast = project.podcastLinks.id(podcastId);

    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found in project" });
    }

    podcast.podcastTranscript = podcastTranscript.trim();

    await project.save();

    return res.status(200).json({
      message: "Podcast updated successfully",
      podcast,
    });
  } catch (error) {
    console.error("Error updating podcast:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// get all projects
const getAllProjects = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const projects = await Project.find({ createdBy: req.user.id });

    return res.status(200).json({
      message: "Projects retrieved successfully",
      projects,
    });
  } catch (error) {
    console.error("Error retrieving projects:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getPodcastEpisodes = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const project = await Project.findOne({
      _id: projectId,
      createdBy: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({
      message: "Podcast episodes retrieved successfully",
      podcastLinks: project.podcastLinks,
    });
  } catch (error) {
    console.error("Error retrieving podcast episodes:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createNewProject,
  uploadPodcast,
  deletePodcast,
  updatePodcast,
  getAllProjects,
  getPodcastEpisodes,
};
