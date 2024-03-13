import express from "express";

import { authMiddleware } from "../middleware/auth-middlleware";
import { isAdmin } from "../middleware/role-middleware";
import insuranceController from "../controller/insurance-controller";

const insuranceRouter = express.Router();
// insuranceRouter.use(authMiddleware);

// Insurance API
//Public
insuranceRouter.get("/api/insurance", insuranceController.getInsurance);
insuranceRouter.get("/api/insurance/:id", insuranceController.getInsuranceById);

// protected admin
insuranceRouter.post(
  "/api/admin/insurance",
  authMiddleware,
  isAdmin,
  insuranceController.createInsurance
);
insuranceRouter.put(
  "/api/admin/insurance/:id",
  authMiddleware,
  isAdmin,
  insuranceController.updateInsurance
);
insuranceRouter.delete(
  "/api/admin/insurance/:id",
  authMiddleware,
  isAdmin,
  insuranceController.deleteInsurance
);

export { insuranceRouter };
