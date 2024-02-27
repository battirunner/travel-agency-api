import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import tourTypeService from "../service/tourType-service";

// @desc Fetch all tour type
// route GET /api/tourtype
// @access Public
const getTourType = asyncHandler(async (req: Request, res: Response) => {
  const tourType = req.query.tourType || "";
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const result = await tourTypeService.getTourType(
    tourType as string,
    page,
    limit
  );
  res.status(200).json({
    data: result,
  });
});

// @desc Fetch a single tour type
// route GET /api/tourtype/:id
// @access Public
const getTourTypeById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourTypeService.getTourTypeById(req.params.id);
    res.status(201).json({ data: result });
  }
);

// @desc Create a tour type
// route POST /api/tourtype
// @access Private/Admin
const createTourType = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourTypeService.createTourType(req.body);
    res.status(201).json({ data: result });
  }
);

// @desc    Update a tour type
// @route   PUT /api/tourtype/:id
// @access  Private/admin
const updateTourType = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    // console.log(req.user.userId);
    // @ts-ignore
    const result = await tourTypeService.updateTourType(
      req.params.id,
      req.body
    );
    res.status(200).json({ data: result });
  }
);

// @desc    Delete a tour type
// @route   DELETE /api/tourtype/:id
// @access  Private/Admin
const deleteTourType = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourTypeService.deleteTourType(req.params.id);
    res.status(200).json({ data: result });
  }
);

export default {
  getTourType,
  getTourTypeById,
  createTourType,
  updateTourType,
  deleteTourType,
};
