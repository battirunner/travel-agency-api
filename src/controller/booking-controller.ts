//external import
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bookingService from "../service/booking-service";

//internal import

// @desc    Create new booking
// @route   POST /api/booking
// @access  Private
const createBooking = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    //@ts-ignore
    data.user_id = req.user.userId;
    const result = await bookingService.createBooking(data);
    res.status(200).json({
      data: result,
    });
  }
);

// @desc    Get loggedin user's booking
// @route   GET /api/booking
// @access  Private
const getBookingByUserId = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const user_id = req.user.userId;
    const result = await bookingService.getBookingByUserId(user_id);
    res.status(200).json({
      data: result,
    });
  }
);

// @desc    get all booking
// @route   GET /api/admin/booking
// @access  Private/Admin
const getBooking = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await bookingService.getBooking();
    res.status(200).json({
      data: result,
    });
  }
);

// @desc    Update booking
// @route   PUT /api/admin/booking/:id
// @access  Private/admin
const updateBooking = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const data = req.body;
    const result = await bookingService.updateBooking(id, data);
    res.status(200).json({
      data: result,
    });
  }
);

// @desc    Delete booking
// @route   DELETE /api/admin/booking/:id
// @access  Private/admin
const deleteBooking = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await bookingService.deleteBooking(id);
    res.status(200).json({
      data: result,
    });
  }
);

// @desc    get booking by id
// @route   GET /api/booking/:id
// @access  Private



export default {
  createBooking,
  getBookingByUserId,
  getBooking,
  updateBooking,
  deleteBooking,
};
