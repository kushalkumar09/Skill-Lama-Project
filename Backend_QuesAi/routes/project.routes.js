const express = require("express");
const {createNewProject, uploadPodcast, deletePodcast, updatePodcast, getAllProjects } = require("../controllers/MediaUploads/mediaHandling");
const { jwtAuthMiddleware } = require("../middleware/jwt.middleware");
const projectsRouter = express.Router();

//  Get Routes
projectsRouter.get("/getAllProjects", jwtAuthMiddleware, getAllProjects);

//  Post Routes
projectsRouter.post("/create-newproject",jwtAuthMiddleware,createNewProject);
projectsRouter.post("/:projectId/upload",jwtAuthMiddleware,uploadPodcast);

// delete Routes
projectsRouter.delete("/projects/:projectId/podcast/:podcastName", jwtAuthMiddleware, deletePodcast);

// patch Routes
projectsRouter.patch("/projects/:projectId/podcast/:podcastName", jwtAuthMiddleware, updatePodcast);



module.exports = projectsRouter;


