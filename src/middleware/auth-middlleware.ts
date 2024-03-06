import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../application/database";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { ResponseError } from "../error/response-error";

export const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("entering auth middleware");
    // const cookies =
    //   Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    // if (cookies) {
    //   try {
    //     const token = cookies[process.env.COOKIE_NAME as string];
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    //     // @ts-ignore
    //     // res.user = await prismaClient.user.findFirst({
    //     // @ts-ignore
    //     //   where: { id: decoded.userId },
    //     //   select:{
    //     //     id:true,
    //     //     name:true,
    //     //     email:true,
    //     //   }
    //     // });
    //     req.user = decoded;
    //     // @ts-ignore
    //     // console.log(req.user);
    //     next();
    //   } catch (error) {
    //     throw new ResponseError(401, "Unauthorized");
    //   }
    // } else {
    //   throw new ResponseError(401, "Unauthorized");
    // }
    //@ts-ignore
    const token = req.get("Authorization")?.replace("Bearer ", "");
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log(decoded);
        // @ts-ignore
        const user = await prismaClient.user.findFirst({
          // @ts-ignore
          where: { id: decoded.userId, email: decoded.email },
          select: { id: true, name: true, email: true, role: true },
        });
        if (!user) {
          throw new ResponseError(401, "Unauthorized");
        } else {
          // @ts-ignore
          req.user = user;
          next();
        }
      } catch (error) {
        console.dir("From authguard", error);
        throw new ResponseError(401, "Unauthorized");
      }
    } else {
      throw new ResponseError(401, "Unauthorized");
    }
  }
);

// export const authMiddleware = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.get("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       res.status(401).json({ errors: "Unauthorized" }).end();
//     } else {
//       const user = await prismaClient.user.findFirst({
//         where: {
//           token: token,
//         },
//       });

//       if (!user) {
//         res
//           .status(401)
//           .json({
//             errors: "Unauthorized",
//           })
//           .end();
//       } else {
//         // @ts-ignore
//         req.user = user;
//         next();
//       }
//     }
//   }
// );
