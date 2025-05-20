const express = require("express");
const {createNewProject, uploadPodcast, deletePodcast, updatePodcast, getAllProjects, getPodcastEpisodes } = require("../controllers/MediaUploads/mediaHandling");
const { jwtAuthMiddleware } = require("../middleware/jwt.middleware");
const projectsRouter = express.Router();

//  Get Routes
projectsRouter.get("/getAllProjects", jwtAuthMiddleware, getAllProjects);
projectsRouter.get("/:projectId/getEpisodes", jwtAuthMiddleware, getPodcastEpisodes);

//  Post Routes
projectsRouter.post("/create-newproject",jwtAuthMiddleware,createNewProject);
projectsRouter.post("/:projectId/upload",jwtAuthMiddleware,uploadPodcast);

// delete Routes
projectsRouter.delete("/:projectId/podcast/:podcastId", jwtAuthMiddleware, deletePodcast);

// patch Routes
projectsRouter.patch("/:projectId/podcast/:podcastId", jwtAuthMiddleware, updatePodcast);



module.exports = projectsRouter;


