import express from "express";
import userController from "../controller/user-controller";
import contactFormController from "../controller/contactForm-controller";

const publicRouter = express.Router();

//test
publicRouter.post("/api/user/registration", userController.registerUser);
publicRouter.post("/api/user/login", userController.loginUser);
publicRouter.post("/api/user/logout", userController.logoutUser);
// publicRouter.post("/api/registration", userController.register);
// publicRouter.post("/api/users/login", userController.login);

// Tours API

// contact form api
publicRouter.route("/api/contact-form-info").post(contactFormController.submitContactForm);


export { publicRouter };
