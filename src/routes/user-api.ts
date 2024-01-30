import express from "express";
// import addressController from "../controller/address-controller";
// import contactController from "../controller/contact-controller";
import userController from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middlleware";
import addressController from "../controller/address-controller";
import { isAdmin } from "../middleware/role-middleware";

const userRouter = express.Router();
userRouter.use(authMiddleware);

// // User API
// userRouter.get("/api/users/current", userController.get);
// userRouter.patch("/api/users/current", userController.update);
// userRouter.delete("/api/users/logout", userController.logout);
userRouter
  .route("/api/user/profile")
  .get(userController.getUserProfile)
  .put(userController.updateUserProfile);
userRouter.put("/api/user/profile", userController.updateUserProfile);

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
//Public
userRouter.get("/api/user/address", addressController.getAddress);
userRouter.get("/api/user/address/:id", addressController.getAddressById);

// protected admin
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
