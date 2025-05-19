const express = require("express");
const { userSignin, userLogin, getUserDetails } = require("../controllers/Authentication/userAuthentication");
const { jwtAuthMiddleware } = require("../middleware/jwt.middleware");
const authRouter = express.Router();

authRouter.get("/userDetails",jwtAuthMiddleware,getUserDetails);

authRouter.post("/usersignin",userSignin);
authRouter.post("/userlogin",userLogin);


module.exports = authRouter;


