import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import tourPackageService from "../service/tourPackage-service";
import generateToken from "../utlis/generateToken";

// @desc Fetch all tours
// route GET /api/tours
// @access Public
const getTours = asyncHandler(async (req: Request, res: Response) => {
  const result = await tourPackageService.getTours();
  res.status(200).json({
    data: result,
  });
});

// @desc Fetch a single tour
// route GET /api/tours/:id
// @access Public
const getToursById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourPackageService.getToursById(req.params.id);
    res.status(201).json({ data: result });
  }
);

// @desc Create a tour
// route POST /api/tours
// @access Private/Admin
const createTour = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourPackageService.createTour(req.body);
    res.status(201).json({ data: result });
  }
);

// @desc    Update a tour
// @route   PUT /api/tours/:id
// @access  Private/admin
const updateTour = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    // console.log(req.user.userId);
    // @ts-ignore
    const result = await tourPackageService.updateTour(req.params.id, req.body);
    res.status(200).json({ data: result });
  }
);

// @desc    Delete a tour
// @route   DELETE /api/tours/:id
// @access  Private/Admin
const deleteTour = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    
    const result = await tourPackageService.deleteTour(req.params.id);
    res.status(200).json({ data:result });
  }
);

export default {
  getTours,
  getToursById,
  createTour,
  updateTour,
  deleteTour,
};
