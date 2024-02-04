import { NextFunction, Request, Response } from "express";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
//not found handler
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new ResponseError(404, `Not Found - ${req.originalUrl}`);
  // logger.error(error);
  // res.status(404);
  next(error);
};

// custom error handler
const errorMiddleware = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) {
    next();
    return;
  }
  //logging for dev env
  logger.error(err);
  // res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
  //   errors: err.message,
  //   stack: process.env.NODE_ENV === "production" ? null : err.stack,
  // });

  if (err instanceof ResponseError) {
    res
      // @ts-ignore
      .status(err.status)
      .json({
        errors: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
      })
      .end();
  } else {
    res.status(500).json({
      errors: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  }
};

export { errorMiddleware, notFound };
