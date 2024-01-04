import express from "express";
import tagController from "../controller/tag-controller";
import { authMiddleware } from "../middleware/auth-middlleware";
import { isAdmin } from "../middleware/role-middleware";

const tagRouter = express.Router();
tagRouter.use(authMiddleware);

// tag API
//Public
tagRouter.get("/api/tag", tagController.getTag);
tagRouter.get("/api/tourtype/:id", tagController.getTagById);

// protected admin
tagRouter.post(
  "/api/tag",
  authMiddleware,
  isAdmin,
  tagController.createTag
);
tagRouter.put(
  "/api/tag/:id",
  authMiddleware,
  isAdmin,
  tagController.updateTag
);
tagRouter.delete(
  "/api/tag/:id",
  authMiddleware,
  isAdmin,
  tagController.deleteTag
);

export { tagRouter };
