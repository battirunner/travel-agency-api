import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/response-error";
import { prismaClient } from "../application/database";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

// interface reqUser extends Request {
//   user: object;
// }

// const isVerifyEmailTokenValid = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const {  id } = req.query;
//     // console.log(res);
//     if (!id || !id) {
//       throw new ResponseError(401, "Invalid Request!");
//     }

//     const user = await prismaClient.user.findUnique({
//       where: { id: id as string },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//       },
//     });

//     if (!user) {
//       throw new ResponseError(404, "Invalid Request!");
//     }

//     // const verificationToken = await prismaClient.verificationToken.findUnique({
//     //   where: { user_id: user.id },
//     // });

//     // if (!verificationToken) {
//     //   throw new ResponseError(404, "Invalid Request!");
//     // }
//     // const validToken = await bcrypt.compare(token as string, resetToken.token);
//     // if (!validToken) {
//     //   throw new ResponseError(404, "Invalid Request!");
//     // }
//     //@ts-ignore
//     req.user = user;
//     next();
//   }
// );

const isResetTokenValid = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, id } = req.query;
    // console.log(res);
    if (!token || !id) {
      throw new ResponseError(401, "Invalid Request!");
    }

    const user = await prismaClient.user.findUnique({
      where: { id: id as string },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      throw new ResponseError(404, "Invalid Request!");
    }

    const resetToken = await prismaClient.resetPasswordToken.findUnique({
      where: { user_id: user.id },
    });

    if (!resetToken) {
      throw new ResponseError(404, "Invalid Request!");
    }
    const validToken = await bcrypt.compare(token as string, resetToken.token);
    if (!validToken) {
      throw new ResponseError(404, "Invalid Request!");
    }
    //@ts-ignore
    req.user = user;
    next();
  }
);




export { isResetTokenValid, 
  // isVerifyEmailTokenValid, 
};
