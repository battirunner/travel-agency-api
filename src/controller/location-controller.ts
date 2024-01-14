import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import locationService from "../service/location-service";

// @desc Fetch all location
// route GET /api/location
// @access Public
const getLocation = asyncHandler(async (req: Request, res: Response) => {
  const result = await locationService.getLocation();
  res.status(200).json({
    data: result,
  });
});

// @desc Fetch a single location
// route GET /api/location/:id
// @access Public
const getLocationById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await locationService.getLocationById(req.params.id);
    res.status(201).json({ data: result });
  }
);

// @desc Create a location
// route POST /api/location
// @access Private/Admin
const createLocation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await locationService.createLocation(req.body);
    res.status(201).json({ data: result });
  }
);

// @desc    Update a Location
// @route   PUT /api/location/:id
// @access  Private/admin
const updateLocation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    // console.log(req.user.userId);
    // @ts-ignore
    const result = await locationService.updateLocation(
      req.params.id,
      req.body
    );
    res.status(200).json({ data: result });
  }
);

// @desc    Delete a Location
// @route   DELETE /api/location/:id
// @access  Private/Admin
const deleteLocation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await locationService.deleteLocation(req.params.id);
    res.status(200).json({ data: result });
  }
);

export default {
  getLocation,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
};
