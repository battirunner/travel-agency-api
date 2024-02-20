import express from "express";
import visaCategoryController from "../controller/visaCategory-controller";
import { authMiddleware } from "../middleware/auth-middlleware";
import { isAdmin } from "../middleware/role-middleware";

const visaCategoryRouter = express.Router();
// visaCategoryRouter.use(authMiddleware);

// visa category API
//Public
visaCategoryRouter.get(
  "/api/visacategory",
  visaCategoryController.getVisaCategory
);
visaCategoryRouter.get(
  "/api/visacategory/:id",
  visaCategoryController.getVisaCategoryById
);

// protected admin
visaCategoryRouter.post(
  "/api/visacategory",
  authMiddleware,
  isAdmin,
  visaCategoryController.createVisaCategory
);
visaCategoryRouter.put(
  "/api/visacategory/:id",
  authMiddleware,
  isAdmin,
  visaCategoryController.updateVisaCategory
);
visaCategoryRouter.delete(
  "/api/visacategory/:id",
  authMiddleware,
  isAdmin,
  visaCategoryController.deleteVisaCategory
);

export { visaCategoryRouter };
