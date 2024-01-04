import express from "express";
import tourTypeController from "../controller/tourType-controller";
import { authMiddleware } from "../middleware/auth-middlleware";
import { isAdmin } from "../middleware/role-middleware";

const tourTypeRouter = express.Router();
tourTypeRouter.use(authMiddleware);

// tour type API
//Public
tourTypeRouter.get("/api/tourtype", tourTypeController.getTourType);
tourTypeRouter.get("/api/tourtype/:id", tourTypeController.getTourTypeById);

// protected admin
tourTypeRouter.post(
  "/api/tourtype",
  authMiddleware,
  isAdmin,
  tourTypeController.createTourType
);
tourTypeRouter.put(
  "/api/tourtype/:id",
  authMiddleware,
  isAdmin,
  tourTypeController.updateTourType
);
tourTypeRouter.delete(
  "/api/tourtype/:id",
  authMiddleware,
  isAdmin,
  tourTypeController.deleteTourType
);

export { tourTypeRouter };
