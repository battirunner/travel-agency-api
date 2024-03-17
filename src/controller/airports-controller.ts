import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import airportsService from "../service/airports-service";

// @desc Fetch all airports
// route GET /api/airports
// @access Public
const getAirports = asyncHandler(async (req: Request, res: Response) => {
  const search = req.query.search || "";
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const result = await airportsService.getAirports(
    search as string,
    page,
    limit
  );
  res.status(200).json({
    data: result,
  });
});

// @desc Fetch a single airports
// route GET /api/airports/:id
// @access Public
const getAirportsById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await airportsService.getAirportsById(req.params.id);
    res.status(201).json({ data: result });
  }
);

// @desc Create a airports
// route POST /api/airports
// @access Private/Admin
const createAirports = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await airportsService.createAirports(req.body);
    res.status(201).json({ data: result });
  }
);

// @desc    Update a airports
// @route   PUT /api/airports/:id
// @access  Private/admin
const updateAirports = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    // console.log(req.user.userId);
    // @ts-ignore
    const result = await airportsService.updateAirports(
      req.params.id,
      req.body
    );
    res.status(200).json({ data: result });
  }
);

// @desc    Delete a airports
// @route   DELETE /api/tours/:id
// @access  Private/Admin
const deleteAirports = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await airportsService.deleteAirports(req.params.id);
    res.status(200).json({ data: result });
  }
);

export default {
  getAirports,
  getAirportsById,
  createAirports,
  updateAirports,
  deleteAirports,
};
