const express = require("express");
const {createNewProject, uploadPodcast, deletePodcast, updatePodcast } = require("../controllers/MediaUploads/mediaHandling");
const { jwtAuthMiddleware } = require("../middleware/jwt.middleware");
const projectsRouter = express.Router();

//  Post Routes
projectsRouter.post("/create-newproject",jwtAuthMiddleware,createNewProject);
projectsRouter.post("/:projectId/upload",jwtAuthMiddleware,uploadPodcast);

// delete Routes
router.delete("/projects/:projectId/podcast/:podcastName", jwtAuthMiddleware, deletePodcast);

// patch Routes
router.patch("/projects/:projectId/podcast/:podcastName", jwtAuthMiddleware, updatePodcast);



module.exports = projectsRouter;


