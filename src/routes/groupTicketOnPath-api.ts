import express from "express";

import { authMiddleware } from "../middleware/auth-middlleware";
import { isAdmin } from "../middleware/role-middleware";
import groupTicketOnPathController from "../controller/groupTicketOnPath-controller";

const groupTicketOnPathRouter = express.Router();
// groupTicketOnPathRouter.use(authMiddleware);

// groupTicketOnPath API
//Public
groupTicketOnPathRouter.get("/api/groupticketonpath", groupTicketOnPathController.getGroupTicketOnPath);
groupTicketOnPathRouter.get("/api/groupticketonpath/:id", groupTicketOnPathController.getGroupTicketOnPathById);

// protected admin
groupTicketOnPathRouter.post(
  "/api/groupticketonpath",
  authMiddleware,
  isAdmin,
  groupTicketOnPathController.createGroupTicketOnPath
);
groupTicketOnPathRouter.put(
  "/api/groupticketonpath/:id",
  authMiddleware,
  isAdmin,
  groupTicketOnPathController.updateGroupTicketOnPath
);
groupTicketOnPathRouter.delete(
  "/api/groupticketonpath/:id",
  authMiddleware,
  isAdmin,
  groupTicketOnPathController.deleteGroupTicketOnPath
);

export { groupTicketOnPathRouter };
