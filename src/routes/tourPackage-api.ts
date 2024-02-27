import express from "express";
import tourPackageController from "../controller/tourPackage-controller";
import { authMiddleware } from "../middleware/auth-middlleware";
import { isAdmin } from "../middleware/role-middleware";

const toursRouter = express.Router();
// toursRouter.use(authMiddleware);

// Tours API
//Public
toursRouter.get("/api/tours", tourPackageController.getTours);
toursRouter.get("/api/tours/:id", tourPackageController.getToursById);

// protected admin
toursRouter.post(
  "/api/admin/tours",
  authMiddleware,
  isAdmin,
  tourPackageController.createTour
);
toursRouter.put(
  "/api/admin/tours/:id",
  authMiddleware,
  isAdmin,
  tourPackageController.updateTour
);
toursRouter.delete(
  "/api/admin/tours/:id",
  authMiddleware,
  isAdmin,
  tourPackageController.deleteTour
);

export { toursRouter };
