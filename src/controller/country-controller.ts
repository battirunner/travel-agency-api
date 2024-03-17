import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import countryService from "../service/country-service";

// @desc Fetch all Country
// route GET /api/Country
// @access Public
const getCountry = asyncHandler(async (req: Request, res: Response) => {
  const search = req.query.search || "";
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const result = await countryService.getCountry(search as string, page, limit);
  res.status(200).json({
    data: { ...result },
  });
});

// @desc Fetch a single Country
// route GET /api/Country/:id
// @access Public
const getCountryById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await countryService.getCountryById(req.params.id);
    res.status(201).json({ data: result });
  }
);

// @desc Create a Country
// route POST /api/Country
// @access Private/Admin
const createCountry = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await countryService.createCountry(req.body);
    res.status(201).json({ data: result });
  }
);

// @desc    Update a Country
// @route   PUT /api/Country/:id
// @access  Private/admin
const updateCountry = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    // console.log(req.user.userId);
    // @ts-ignore
    const result = await countryService.updateCountry(req.params.id, req.body);
    res.status(200).json({ data: result });
  }
);

// @desc    Delete a Country
// @route   DELETE /api/tours/:id
// @access  Private/Admin
const deleteCountry = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await countryService.deleteCountry(req.params.id);
    res.status(200).json({ data: result });
  }
);

export default {
  getCountry,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
};
