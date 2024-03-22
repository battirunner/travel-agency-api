// import express from "express";

// import { authMiddleware } from "../middleware/auth-middlleware";
// import { isAdmin } from "../middleware/role-middleware";
// import ticketPathController from "../controller/ticketPath-controller";

// const ticketPathRouter = express.Router();
// // ticketPathRouter.use(authMiddleware);

// // Insurance API
// //Public
// ticketPathRouter.get("/api/ticketpath", ticketPathController.getTicketPath);
// ticketPathRouter.get("/api/ticketpath/:id", ticketPathController.getTicketPath);

// // protected admin
// // ticketPathRouter.post(
// //   "/api/ticketpath",
// //   authMiddleware,
// //   isAdmin,
// //   ticketPathController.createTicketPath
// // );
// ticketPathRouter.put(
//   "/api/ticketpath/:id",
//   authMiddleware,
//   isAdmin,
//   ticketPathController.updateTicketPath
// );
// ticketPathRouter.delete(
//   "/api/ticketpath/:id",
//   authMiddleware,
//   isAdmin,
//   ticketPathController.deleteTicketPath
// );

// export { ticketPathRouter };
