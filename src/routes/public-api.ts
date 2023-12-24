import express from "express";
import userController from "../controller/user-controller";
import  authUser  from "../controller/user-controller";

const publicRouter = express.Router();

//test
publicRouter.post("/api/user/registration", userController.registerUser);
publicRouter.post("/api/user/login", userController.loginUser);
publicRouter.post("/api/user/logout", userController.logoutUser);
// publicRouter.post("/api/registration", userController.register);
// publicRouter.post("/api/users/login", userController.login);

export { publicRouter };
