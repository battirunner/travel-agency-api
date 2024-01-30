import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import tagService from "../service/tag-service";

// @desc Fetch all tags
// route GET /api/tag
// @access Public
const getTag = asyncHandler(async (req: Request, res: Response) => {
  const result = await tagService.getTag();
  res.status(200).json({
    data: result,
  });
});

// @desc Fetch a single tag
// route GET /api/tag/:id
// @access Public
const getTagById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tagService.getTagById(req.params.id);
    res.status(201).json({ data: result });
  }
);

// @desc Create a tag
// route POST /api/tag
// @access Private/Admin
const createTag = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tagService.createTag(req.body);
    res.status(201).json({ data: result });
  }
);

// @desc    Update a tag
// @route   PUT /api/tag/:id
// @access  Private/admin
const updateTag = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    // console.log(req.user.userId);
    // @ts-ignore
    const result = await tagService.updateTag(req.params.id, req.body);
    res.status(200).json({ data: result });
  }
);

// @desc    Delete a tag
// @route   DELETE /api/tag/:id
// @access  Private/Admin
const deleteTag = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tagService.deleteTag(req.params.id);
    res.status(200).json({ data: result });
  }
);

export default {
  getTag,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
};
