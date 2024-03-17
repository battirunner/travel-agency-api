import express from "express";
import airportsController from "../controller/airports-controller";
import { authMiddleware } from "../middleware/auth-middlleware";
import { isAdmin } from "../middleware/role-middleware";

const airportsRouter = express.Router();

// Booking API
//Public

airportsRouter.get(
  "/api/airports",
  airportsController.getAirports
);

airportsRouter.get(
    "/api/airports/:id",
    airportsController.getAirportsById
  );

// protected user



// protected admin
airportsRouter.post(
  "/api/admin/airports",
  authMiddleware,
  isAdmin,
  airportsController.createAirports
);

airportsRouter.put(
  "/api/admin/airports/:id",
  authMiddleware,
  isAdmin,
  airportsController.updateAirports
);
airportsRouter.delete(
  "/api/admin/airports/:id",
  authMiddleware,
  isAdmin,
  airportsController.deleteAirports
);

export { airportsRouter };
