const Project = require("../../model/projects.model");

const createNewProject = async (req, res) => {
  try {
    const { projectName } = req.body;
    console.log(req.user)
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized User to create project" });
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
      return res.status(409).json({ message: "You already have a project with this name" });
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
    console.log(podcastName,podcastTranscript)

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authorized to upload podcast" });
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
      (podcast) => podcast.podcastName.trim().toLowerCase() === podcastName.trim().toLowerCase()
    );

    if (alreadyExists) {
      return res.status(409).json({ message: "Podcast with this name already exists in the project" });
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
    const { projectId, podcastName } = req.params;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authorized to delete podcast" });
    }

    if (!podcastName) {
      return res.status(400).json({ message: "Podcast name is required" });
    }

    const project = await Project.findOne({
      _id: projectId,
      createdBy: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found or unauthorized" });
    }

    const initialLength = project.podcastLinks.length;

    project.podcastLinks = project.podcastLinks.filter(
      (podcast) =>
        podcast.podcastName.trim().toLowerCase() !== podcastName.trim().toLowerCase()
    );

    if (project.podcastLinks.length === initialLength) {
      return res.status(404).json({ message: "Podcast not found in the project" });
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
    const { projectId, podcastName } = req.params;
    const { newPodcastName, newPodcastTranscript } = req.body;

    // Validate user
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    // Validate body
    if (!newPodcastName && !newPodcastTranscript) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    // Find the project
    const project = await Project.findOne({
      _id: projectId,
      createdBy: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const podcast = project.podcastLinks.find(
      (p) => p.podcastName.trim().toLowerCase() === podcastName.trim().toLowerCase()
    );

    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found in project" });
    }

    // Check for duplicate podcast name if name is being updated
    if (newPodcastName) {
      const nameExists = project.podcastLinks.some(
        (p) =>
          p.podcastName.trim().toLowerCase() === newPodcastName.trim().toLowerCase() &&
          p !== podcast
      );
      if (nameExists) {
        return res.status(409).json({ message: "Another podcast with this name already exists" });
      }
      podcast.podcastName = newPodcastName.trim();
    }

    // Update transcript
    if (newPodcastTranscript) {
      podcast.podcastTranscript = newPodcastTranscript.trim();
    }

    const updatedProject = await project.save();

    return res.status(200).json({
      message: "Podcast updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error updating podcast:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { updatePodcast };




module.exports = { createNewProject, uploadPodcast , deletePodcast, updatePodcast };
