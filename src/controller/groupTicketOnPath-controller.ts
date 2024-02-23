import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import groupTicketOnPathService from "../service/groupTicketOnPath-service";


// @desc Fetch all GroupTicketOnPath
// route GET /api/GroupTicketOnPath
// @access Public
const getGroupTicketOnPath = asyncHandler(async (req: Request, res: Response) => {
  const result = await groupTicketOnPathService.getGroupTicketOnPath();
  res.status(200).json({
    data: result,
  });
});

// @desc Fetch a single GroupTicketOnPath
// route GET /api/GroupTicketOnPath/:id
// @access Public
const getGroupTicketOnPathById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await groupTicketOnPathService.getGroupTicketOnPathById(req.params.id);
    res.status(201).json({ data: result });
  }
);

// @desc Create a GroupTicketOnPath
// route POST /api/GroupTicketOnPath
// @access Private/Admin
const createGroupTicketOnPath = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await groupTicketOnPathService.createGroupTicketOnPath(req.body);
    res.status(201).json({ data: result });
  }
);

// @desc    Update a GroupTicketOnPath
// @route   PUT /api/GroupTicketOnPath/:id
// @access  Private/admin
const updateGroupTicketOnPath = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    // console.log(req.user.userId);
    // @ts-ignore
    const result = await groupTicketOnPathService.updateGroupTicketOnPath(req.params.id, req.body);
    res.status(200).json({ data: result });
  }
);

// @desc    Delete a GroupTicketOnPath
// @route   DELETE /api/tours/:id
// @access  Private/Admin
const deleteGroupTicketOnPath = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    
    const result = await groupTicketOnPathService.deleteGroupTicketOnPath(req.params.id);
    res.status(200).json({ data:result });
  }
);

export default {
  getGroupTicketOnPath,
  getGroupTicketOnPathById,
  createGroupTicketOnPath,
  updateGroupTicketOnPath,
  deleteGroupTicketOnPath,
};
