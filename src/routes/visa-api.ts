import express from "express";

import visaController from "../controller/visa-controller";
import { authMiddleware } from "../middleware/auth-middlleware";
import { isAdmin } from "../middleware/role-middleware";

const visaRouter = express.Router();
// visaRouter.use(authMiddleware);

// visa API
//Public
visaRouter.get("/api/visa", visaController.getVisa);
visaRouter.get("/api/visa/:id", visaController.getVisaById);

// protected admin
visaRouter.post(
  "/api/admin/visa",
  authMiddleware,
  isAdmin,
  visaController.createVisa
);
visaRouter.put(
  "/api/admin/visa/:id",
  authMiddleware,
  isAdmin,
  visaController.updateVisa
);
visaRouter.delete(
  "/api/admin/visa/:id",
  authMiddleware,
  isAdmin,
  visaController.deleteVisa
);

export { visaRouter };
