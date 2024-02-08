import express from "express";
// import addressController from "../controller/address-controller";
// import contactController from "../controller/contact-controller";
import addressController from "../controller/address-controller";
import userController from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middlleware";
import { isResetTokenValid } from "../middleware/resetToken-middleware";
import { isAdmin } from "../middleware/role-middleware";

const userRouter = express.Router();

userRouter
  .route("/api/user/forgot-password")
  .post(userController.forgotUserPassword);

userRouter
  .route("/api/user/reset-password")
  .post(isResetTokenValid, userController.resetUserPassword);

userRouter
  .route("/api/user/verify-token")
  .get(isResetTokenValid, userController.verifyToken);

userRouter.route("/api/user/verify-email").post(userController.verifyUserEmail);

// userRouter.use(authMiddleware);

// // User API
// userRouter.get("/api/users/current", userController.get);
// userRouter.patch("/api/users/current", userController.update);
// userRouter.delete("/api/users/logout", userController.logout);
userRouter
  .route("/api/user/profile")
  .get(authMiddleware, userController.getUserProfile)
  .put(authMiddleware, userController.updateUserProfile);
// userRouter.put("/api/user/profile", userController.updateUserProfile);

// // Contact API
// userRouter.post("/api/contacts", contactController.create);
// userRouter.get("/api/contacts/:contactId", contactController.get);
// userRouter.put("/api/contacts/:contactId", contactController.update);
// userRouter.delete("/api/contacts/:contactId", contactController.remove);
// userRouter.get("/api/contacts", contactController.search);

// Address API
// userRouter.post("/api/contacts/:contactId/addresses", addressController.create);
// userRouter.get("/api/contacts/:contactId/addresses/:addressId", addressController.get);
// userRouter.put("/api/contacts/:contactId/addresses/:addressId", addressController.update);
// userRouter.delete("/api/contacts/:contactId/addresses/:addressId", addressController.remove);
// userRouter.get("/api/contacts/:contactId/addresses", addressController.list);
// location API

userRouter.get(
  "/api/user/address",
  authMiddleware,
  addressController.getAddress
);
userRouter.get(
  "/api/user/address/:id",
  authMiddleware,
  addressController.getAddressById
);

// protected admin
// get all user
userRouter.get(
  "/api/admin/users",
  authMiddleware,
  isAdmin,
  userController.getAllUsers
);
// create user
userRouter.post(
  "/api/admin/user/create",
  authMiddleware,
  isAdmin,
  userController.createUser
);
// get user by id
userRouter.get(
  "/api/admin/user/:id",
  authMiddleware,
  isAdmin,
  userController.getUserById
);
// update user by id
userRouter.put(
  "/api/admin/user/:id",
  authMiddleware,
  isAdmin,
  userController.updateUserById
);
// delete user by id
userRouter.delete(
  "/api/admin/user/:id",
  authMiddleware,
  isAdmin,
  userController.deleteUserById
);

userRouter.post(
  "/api/user/address",
  authMiddleware,
  isAdmin,
  addressController.createAddress
);
userRouter.put(
  "/api/user/address/:id",
  authMiddleware,
  isAdmin,
  addressController.updateAddress
);
userRouter.delete(
  "/api/user/address/:id",
  authMiddleware,
  isAdmin,
  addressController.deleteAddress
);

export { userRouter };
