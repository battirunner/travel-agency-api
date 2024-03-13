import aws from "aws-sdk";
import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import contactFormController from "../controller/contactForm-controller";
import userController from "../controller/user-controller";

const publicRouter = express.Router();

// const endPoint = process.env.DO_SPACES_URL;
// // Set S3 endpoint to DigitalOcean Spaces
// const spacesEndpoint = new aws.Endpoint(`${endPoint}`);
// const s3 = new aws.S3({
//   endpoint: spacesEndpoint,
//   accessKeyId: process.env.DO_ACCESS_KEY_ID,
//   secretAccessKey: process.env.DO_SECRET_ACCESS_KEY,
// });

// // console.log(`${process.env.DO_SPACES_URL}`);

// // Change bucket property to your Space name
// const upload = multer({
//   storage: multerS3({
//     //@ts-ignore
//     s3: s3,
//     bucket: `${process.env.DO_BUCKET}/users/profilepic`,
//     acl: "public-read",
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     metadata: (req, file, cb) => {
//       cb(null, {
//         fieldName: file.fieldname,
//       });
//     },

//     key: function (request, file, cb) {
//       console.log(file);
//       cb(null, file.originalname);
//     },
//   }),
// }).array("upload", 1);

//test
publicRouter.post("/api/user/registration", userController.registerUser);
publicRouter.post("/api/user/login", userController.loginUser);
publicRouter.post("/api/user/logout", userController.logoutUser);
// publicRouter.post("/api/registration", userController.register);
// publicRouter.post("/api/users/login", userController.login);
// publicRouter.post("/api/tempUpload", (req, res, next) => {
//   upload(req,res,next);
//   console.dir("successs!");
//   res.status(200).send({ message: "success" });
// });

// Tours API

// contact form api
publicRouter
  .route("/api/contact-form-info")
  .post(contactFormController.submitContactForm);

export { publicRouter };
