import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import visaService from "../service/visaCategory-service";
import generateToken from "../utlis/generateToken";

// @desc Fetch all visa category
// route GET /api/visacategory
// @access Public
const getVisaCategory = asyncHandler(async (req: Request, res: Response) => {
  const result = await visaService.getVisaCategory();
  // generateToken(res, result);
  res.status(200).json({
    data: result,
  });
});

// @desc Fetch a single visa category
// route GET /api/visacategory/:id
// @access Public
const getVisaCategoryById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await visaService.getVisaCategoryById(req.params.id);
    // generateToken(res, result);
    res.status(200).json({ data: result });
  }
);

// @desc Create a visa category
// route POST /api/visacategory
// @access Private/Admin
const createVisaCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await visaService.createVisaCategory(req.body);
    // generateToken(res, result);
    res.status(201).json({ data: result });
  }
);

// @desc    Update a visa category
// @route   PUT /api/visacategory/:id
// @access  Private/admin
const updateVisaCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    // console.log(req.user.userId);
    // @ts-ignore
    const result = await visaService.updateVisaCategory(req.params.id, req.body);
    res.status(200).json({ data: result });
  }
);

// @desc    Delete a visa category
// @route   DELETE /api/visacategory/:id
// @access  Private/Admin
const deleteVisaCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    
    const result = await visaService.deleteVisaCategory(req.params.id);
    // generateToken(res, result);
    res.status(200).json({ data:result });
  }
);

export default {
  getVisaCategory,
  getVisaCategoryById,
  createVisaCategory,
  updateVisaCategory,
  deleteVisaCategory,
};
