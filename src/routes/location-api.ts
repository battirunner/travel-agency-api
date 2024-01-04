import express from "express";
import locationController from "../controller/location-controller";
import { authMiddleware } from "../middleware/auth-middlleware";
import { isAdmin } from "../middleware/role-middleware";

const locationRouter = express.Router();
locationRouter.use(authMiddleware);

// location API
//Public
locationRouter.get("/api/location", locationController.getLocation);
locationRouter.get("/api/location/:id", locationController.getLocationById);

// protected admin
locationRouter.post(
  "/api/location",
  authMiddleware,
  isAdmin,
  locationController.createLocation
);
locationRouter.put(
  "/api/location/:id",
  authMiddleware,
  isAdmin,
  locationController.updateLocation
);
locationRouter.delete(
  "/api/location/:id",
  authMiddleware,
  isAdmin,
  locationController.deleteLocation
);

export { locationRouter };
