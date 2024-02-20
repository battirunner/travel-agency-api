import express from "express";

import insuranceCategoryController from "../controller/insuranceCategory-controller";
import { authMiddleware } from "../middleware/auth-middlleware";
import { isAdmin } from "../middleware/role-middleware";

const insuranceCategoryRouter = express.Router();
// insuranceCategoryRouter.use(authMiddleware);

// visa category API
//Public
insuranceCategoryRouter.get(
  "/api/insurance/category",
  insuranceCategoryController.getInsuranceCategory
);
insuranceCategoryRouter.get(
  "/api/insurance/category/:id",
  insuranceCategoryController.getInsuranceCategoryById
);

// protected admin
insuranceCategoryRouter.post(
  "/api/insurance/category",
  authMiddleware,
  isAdmin,
  insuranceCategoryController.createInsuranceCategory
);
insuranceCategoryRouter.put(
  "/api/insurance/category/:id",
  authMiddleware,
  isAdmin,
  insuranceCategoryController.updateInsuranceCategory
);
insuranceCategoryRouter.delete(
  "/api/insurance/category/:id",
  authMiddleware,
  isAdmin,
  insuranceCategoryController.deleteInsuranceCategory
);

export { insuranceCategoryRouter };
