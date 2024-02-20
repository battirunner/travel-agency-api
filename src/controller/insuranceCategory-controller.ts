import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";

import generateToken from "../utlis/generateToken";
import insuranceCategoryService from "../service/insuranceCategory-service";

// @desc Fetch all insurance category
// route GET /api/insurancecategory
// @access Public
const getInsuranceCategory = asyncHandler(async (req: Request, res: Response) => {
  const result = await insuranceCategoryService.getInsuranceCategory();
  generateToken(res, result);
  res.status(200).json({
    data: result,
  });
});

// @desc Fetch a single insurance category
// route GET /api/insurancecategory/:id
// @access Public
const getInsuranceCategoryById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await insuranceCategoryService.getInsuranceCategoryById(req.params.id);
    generateToken(res, result);
    res.status(200).json({ data: result });
  }
);

// @desc Create a insurance category
// route POST /api/insurancecategory
// @access Private/Admin
const createInsuranceCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await insuranceCategoryService.createInsuranceCategory(req.body);
    generateToken(res, result);
    res.status(201).json({ data: result });
  }
);

// @desc    Update a insurance category
// @route   PUT /api/insurancecategory/:id
// @access  Private/admin
const updateInsuranceCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    // console.log(req.user.userId);
    // @ts-ignore
    const result = await insuranceCategoryService.updateInsuranceCategory(req.params.id, req.body);
    res.status(200).json({ data: result });
  }
);

// @desc    Delete a insurance category
// @route   DELETE /api/insurancecategory/:id
// @access  Private/Admin
const deleteInsuranceCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    
    const result = await insuranceCategoryService.deleteInsuranceCategory(req.params.id);
    generateToken(res, result);
    res.status(200).json({ data:result });
  }
);

export default {
  getInsuranceCategory,
  getInsuranceCategoryById,
  createInsuranceCategory,
  updateInsuranceCategory,
  deleteInsuranceCategory,
};
