import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import mediaService from "../service/media-service";

// @desc Fetch all media
// route GET /api/media
// @access Public
const getMedia = asyncHandler(async (req: Request, res: Response) => {
  const result = await mediaService.getMedia();
  res.status(200).json({
    data: result,
  });
});

// @desc Fetch a single media
// route GET /api/media/:id
// @access Public
const getMediaById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await mediaService.getMediaById(req.params.id);
    res.status(201).json({ data: result });
  }
);

// @desc Create a media
// route POST /api/media
// @access Private/Admin
const createMedia = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await mediaService.createMedia(req.body);
    res.status(201).json({ data: result });
  }
);

// @desc    Update a media
// @route   PUT /api/media/:id
// @access  Private/admin
const updateMedia = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    // console.log(req.user.userId);
    // @ts-ignore
    const result = await mediaService.updateMedia(req.params.id, req.body);
    res.status(200).json({ data: result });
  }
);

// @desc    Delete a media
// @route   DELETE /api/media/:id
// @access  Private/Admin
const deleteMedia = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await mediaService.deleteMedia(req.params.id);
    res.status(200).json({ data: result });
  }
);

export default {
  getMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
};
