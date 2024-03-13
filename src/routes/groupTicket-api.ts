import express from "express";

import { authMiddleware } from "../middleware/auth-middlleware";
import { isAdmin } from "../middleware/role-middleware";
import groupTicketController from "../controller/groupTicket-controller";

const groupTicketRouter = express.Router();
// groupTicketRouter.use(authMiddleware);

// Insurance API
//Public
groupTicketRouter.get("/api/groupticket", groupTicketController.getGroupTicket);
groupTicketRouter.get("/api/groupticket/:id", groupTicketController.getGroupTicketById);

// protected admin
groupTicketRouter.post(
  "/api/admin/groupticket",
  authMiddleware,
  isAdmin,
  groupTicketController.createGroupTicket
);
groupTicketRouter.put(
  "/api/admin/groupticket/:id",
  authMiddleware,
  isAdmin,
  groupTicketController.updateGroupTicket
);
groupTicketRouter.delete(
  "/api/admin/groupticket/:id",
  authMiddleware,
  isAdmin,
  groupTicketController.deleteGroupTicket
);

export { groupTicketRouter };
