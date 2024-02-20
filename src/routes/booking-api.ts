import express from "express";
import bookingController from "../controller/booking-controller";
import { authMiddleware } from "../middleware/auth-middlleware";
import { isAdmin } from "../middleware/role-middleware";

const bookingRouter = express.Router();

// Booking API
//Public


// protected user
bookingRouter.post(
  "/api/booking",
  authMiddleware,
  bookingController.createBooking
);

bookingRouter.get("/api/booking",authMiddleware, bookingController.getBookingByUserId);

// protected admin

bookingRouter.get(
  "/api/admin/booking",
  authMiddleware,
  isAdmin,
  bookingController.getBooking
);

bookingRouter.put(
  "/api/admin/booking/:id",
  authMiddleware,
  isAdmin,
  bookingController.updateBooking
);
bookingRouter.delete(
  "/api/admin/booking/:id",
  authMiddleware,
  isAdmin,
  bookingController.deleteBooking
);

export { bookingRouter };
