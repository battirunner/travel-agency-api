import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import groupTicketService from "../service/groupTicket-service";


// @desc Fetch all groupTicket
// route GET /api/groupTicket
// @access Public
const getGroupTicket = asyncHandler(async (req: Request, res: Response) => {
  const result = await groupTicketService.getGroupTicket();
  res.status(200).json({
    data: result,
  });
});

// @desc Fetch a single groupTicket
// route GET /api/groupTicket/:id
// @access Public
const getGroupTicketById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await groupTicketService.getGroupTicketById(req.params.id);
    res.status(201).json({ data: result });
  }
);

// @desc Create a groupTicket
// route POST /api/groupTicket
// @access Private/Admin
const createGroupTicket = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const groupTicket = req.body.groupTicket;
    const ticketPath = req.body.ticketPath;
    const result = await groupTicketService.createGroupTicket(groupTicket,ticketPath);
    res.status(201).json({ data: result });
  }
);

// @desc    Update a groupTicket
// @route   PUT /api/groupTicket/:id
// @access  Private/admin
const updateGroupTicket = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    // console.log(req.user.userId);
    // @ts-ignore
    const result = await groupTicketService.updategroupTicket(req.params.id, req.body);
    res.status(200).json({ data: result });
  }
);

// @desc    Delete a groupTicket
// @route   DELETE /api/tours/:id
// @access  Private/Admin
const deleteGroupTicket = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    
    const result = await groupTicketService.deleteGroupTicket(req.params.id);
    res.status(200).json({ data:result });
  }
);

export default {
  getGroupTicket,
  getGroupTicketById,
  createGroupTicket,
  updateGroupTicket,
  deleteGroupTicket,
};
