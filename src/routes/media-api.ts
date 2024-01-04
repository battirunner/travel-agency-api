import express from "express";
import mediaController from "../controller/media-controller";
import { authMiddleware } from "../middleware/auth-middlleware";
import { isAdmin } from "../middleware/role-middleware";

const mediaRouter = express.Router();
mediaRouter.use(authMiddleware);

// media API
//Public
mediaRouter.get("/api/media", mediaController.getMedia);
mediaRouter.get("/api/media/:id", mediaController.getMediaById);

// protected admin
mediaRouter.post(
  "/api/media",
  authMiddleware,
  isAdmin,
  mediaController.createMedia
);
mediaRouter.put(
  "/api/media/:id",
  authMiddleware,
  isAdmin,
  mediaController.updateMedia
);
mediaRouter.delete(
  "/api/media/:id",
  authMiddleware,
  isAdmin,
  mediaController.deleteMedia
);

export { mediaRouter };
