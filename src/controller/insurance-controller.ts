import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import insuranceService from "../service/insurance-service";


// @desc Fetch all insurance
// route GET /api/insurance
// @access Public
const getInsurance = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const result = await insuranceService.getInsurance(page, limit);
  res.status(200).json({
    data: result,
  });
});

// @desc Fetch a single insurance
// route GET /api/insurance/:id
// @access Public
const getInsuranceById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await insuranceService.getInsuranceById(req.params.id);
    res.status(201).json({ data: {...result} });
  }
);

// @desc Create a insurance
// route POST /api/insurance
// @access Private/Admin
const createInsurance = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await insuranceService.createInsurance(req.body);
    res.status(201).json({ data: result });
  }
);

// @desc    Update a insurance
// @route   PUT /api/insurance/:id
// @access  Private/admin
const updateInsurance = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    // console.log(req.user.userId);
    // @ts-ignore
    const result = await insuranceService.updateInsurance(req.params.id, req.body);
    res.status(200).json({ data: result });
  }
);

// @desc    Delete a insurance
// @route   DELETE /api/tours/:id
// @access  Private/Admin
const deleteInsurance = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    
    const result = await insuranceService.deleteInsurance(req.params.id);
    res.status(200).json({ data:result });
  }
);

export default {
  getInsurance,
  getInsuranceById,
  createInsurance,
  updateInsurance,
  deleteInsurance,
};
