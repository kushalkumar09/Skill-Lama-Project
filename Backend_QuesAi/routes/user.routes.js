const express = require("express");
const { userSignin, userLogin } = require("../controllers/Authentication/userAuthentication");
const authRouter = express.Router();

authRouter.post("/usersignin",userSignin);
authRouter.post("/userlogin",userLogin);

module.exports = authRouter;


