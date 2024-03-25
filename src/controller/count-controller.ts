import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import countService from "../service/count-service";

// @desc Fetch all counts of tables
// route GET /api/count
// @access Public
const getCount = asyncHandler(async (req: Request, res: Response) => {
//   const search = req.query.search || "";
//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 10;
  const result = await countService.getCount(
  );
  res.status(200).json({
    data: result,
  });
});



export default {
  getCount,
  
};
