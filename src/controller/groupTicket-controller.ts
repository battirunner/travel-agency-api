import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import groupTicketService from "../service/groupTicket-service";

// @desc Fetch all groupTicket
// route GET /api/groupTicket
// @access Public
const getGroupTicket = asyncHandler(async (req: Request, res: Response) => {
  const country = req.query.country || "";
  const from = req.query.from || "";
  const to = req.query.to || "";
  const start_date = req.query.start_date || "";
  const end_date = req.query.end_date || "";
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const result = await groupTicketService.getGroupTicket(
    country as string,
    from as string,
    to as string,
    start_date as string,
    end_date as string,
    page,
    limit
  );
  res.status(200).json({
    data: { ...result },
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
    const result = await groupTicketService.createGroupTicket(req.body);
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
    const result = await groupTicketService.updategroupTicket(
      req.params.id,
      req.body
    );
    res.status(200).json({ data: result });
  }
);

// @desc    Delete a groupTicket
// @route   DELETE /api/tours/:id
// @access  Private/Admin
const deleteGroupTicket = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await groupTicketService.deleteGroupTicket(req.params.id);
    res.status(200).json({ data: result });
  }
);

export default {
  getGroupTicket,
  getGroupTicketById,
  createGroupTicket,
  updateGroupTicket,
  deleteGroupTicket,
};
