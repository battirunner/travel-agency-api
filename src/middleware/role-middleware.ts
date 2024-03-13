import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import  asyncHandler from "express-async-handler";

const isAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    if (req.user) {
      //@ts-ignore
      console.log(req.user);
      const userRole = await prismaClient.user.findFirst({
        //@ts-ignore
        where: { id: req.user.id },
      });

    //   console.log(userRole);
      //@ts-ignore
      if (userRole && userRole.role === "ADMIN") {
        next();
      } else {
        throw new ResponseError(401, "Not Authorized");
      }
    } else {
      throw new ResponseError(401, "Not Authorized");
    }
  }
);

export { isAdmin };
