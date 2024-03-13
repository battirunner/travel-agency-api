import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import visaService from "../service/visa-service";

// @desc Fetch all visa
// route GET /api/visa
// @access Public
const getVisa = asyncHandler(async (req: Request, res: Response) => {
  const country = req.query.country || "";
  const visaCategory = req.query.visaCategory || "";
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const result = await visaService.getVisa(country as string, visaCategory as string,page,limit);
  console.log("from visa controller", result);
  res.status(200).json({
    data: {...result},
  });
});

// @desc Fetch a single visa
// route GET /api/visa/:id
// @access Public
const getVisaById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await visaService.getVisaById(req.params.id);
    res.status(201).json({ data: result });
  }
);

// @desc Create a visa
// route POST /api/visa
// @access Private/Admin
const createVisa = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await visaService.createVisa(req.body);
    res.status(201).json({ data: result });
  }
);

// @desc    Update a visa
// @route   PUT /api/visa/:id
// @access  Private/admin
const updateVisa = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    // console.log(req.user.userId);
    // @ts-ignore
    const result = await visaService.updateVisa(req.params.id, req.body);
    res.status(200).json({ data: result });
  }
);

// @desc    Delete a visa
// @route   DELETE /api/tours/:id
// @access  Private/Admin
const deleteVisa = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await visaService.deleteVisa(req.params.id);
    res.status(200).json({ data: result });
  }
);

export default {
  getVisa,
  getVisaById,
  createVisa,
  updateVisa,
  deleteVisa,
};
