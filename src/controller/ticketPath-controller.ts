import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import ticketPathService from "../service/ticketPath-service";


// @desc Fetch all TicketPath
// route GET /api/TicketPath
// @access Public
const getTicketPath = asyncHandler(async (req: Request, res: Response) => {
  const result = await ticketPathService.getTicketPath();
  res.status(200).json({
    data: result,
  });
});

// @desc Fetch a single TicketPath
// route GET /api/TicketPath/:id
// @access Public
const getTicketPathById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await ticketPathService.getTicketPathById(req.params.id);
    res.status(201).json({ data: result });
  }
);

// @desc Create a TicketPath
// route POST /api/TicketPath
// @access Private/Admin
const createTicketPath = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await ticketPathService.createTicketPath(req.body);
    res.status(201).json({ data: result });
  }
);

// @desc    Update a TicketPath
// @route   PUT /api/TicketPath/:id
// @access  Private/admin
const updateTicketPath = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    // console.log(req.user.userId);
    // @ts-ignore
    const result = await ticketPathService.updateTicketPath(req.params.id, req.body);
    res.status(200).json({ data: result });
  }
);

// @desc    Delete a TicketPath
// @route   DELETE /api/tours/:id
// @access  Private/Admin
const deleteTicketPath = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    
    const result = await ticketPathService.deleteTicketPath(req.params.id);
    res.status(200).json({ data:result });
  }
);

export default {
  getTicketPath,
  getTicketPathById,
  createTicketPath,
  updateTicketPath,
  deleteTicketPath,
};
