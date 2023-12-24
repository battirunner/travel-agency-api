import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import userService from "../service/user-service";
import generateToken from "../utlis/generateToken";
import { ResponseError } from "../error/response-error";

// @desc Login user
// route POST /api/user/login
// @access Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.login(req.body);
  generateToken(res, result);
  res.status(200).json({
    data:result,
  });
});

// @desc Register a new user
// route POST /api/user/registration
// @access Public
const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.register(req.body);
    generateToken(res, result);
    res.status(201).json({ data:result, });
  }
);

// @desc Logout user
// route POST /api/user/logout
// @access Private
const logoutUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // res.cookie('jwt','', {
    //   httpOnly:true,
    //   expires: new Date(0),
    // })

    if (
      Object.keys(req.signedCookies).length > 0 &&
      Object.keys(req.signedCookies).includes(`${process.env.COOKIE_NAME}`)
    ) {
      res.clearCookie(process.env.COOKIE_NAME as string, {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({ message: "User logged Out" });
    } else {
      throw new ResponseError(401, "Please login first!");
    }
  }
);

// @desc Get User Profile
// route GET /api/user/profile
// @access Private
const getUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    // console.log(req.user.userId);
    // @ts-ignore
    const result = await userService.get(req.user.userId);
    res.status(200).json({ data:result, });
  }
);

// @desc Updet User Profile
// route PUT /api/user/profile
// @access Private
const updateUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    console.dir(req.user);
    // @ts-ignore
    // const username = req.user.userName;
    const reqData: {
      id: string | null;
      name: string | null;
      password: string | null;
      email: string | null;
      phone: string | null;
    } = {
      // @ts-ignore
      id: req.user.userId as string | null,
      name: req.body.name ? req.body.name : null,
      password: req.body.password ? req.body.password : null,
      email: req.body.email ? req.body.email : null,
      phone: req.body.phone ? req.body.phone : null,
    };
    const result = await userService.update(reqData);
    generateToken(res, result);
    res.status(200).json({ ...result });
  }
);

// const register = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await userService.register(req.body);

//     res.status(200).json({
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const login = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await userService.login(req.body);

//     res.status(200).json({
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const get = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // @ts-ignore
//     const user = await req.user;
//     const username = (await user.username) as string;

//     const result = await userService.get(username);

//     res.status(200).json({ data: result });
//   } catch (error) {
//     next(error);
//   }
// };

// const update = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // @ts-ignore
//     console.dir(req.body);
//     // @ts-ignore
//     const username = req.user.username;
//     const reqData: {
//       name: string;
//       password: string;
//       username: string;
//     } = {
//       name: req.body.name,
//       password: req.body.password,
//       username: username,
//     };

//     const result = await userService.update(reqData);

//     res.status(200).json({ data: result });
//   } catch (error) {
//     next(error);
//   }
// };

// const logout = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // @ts-ignore
//     const username = req.user.username as string;
//     await userService.logout(username);
//     res.status(200).json({ data: "OK" });
//   } catch (error) {
//     next(error);
//   }
// };

export default {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  // register,
  // login,
  // get,
  // update,
  // logout,
};
