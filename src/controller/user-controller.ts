import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ResponseError } from "../error/response-error";
import userService from "../service/user-service";
import generateToken from "../utlis/generateToken";


// @desc Login user
// route POST /api/user/login
// @access Public
const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.login(req.body);
    // console.log("from controller");
    // console.log(result);
    generateToken(res, result);
    res.status(200).json({
      data: result,
    });
  }
);

// @desc Register a new user
// route POST /api/user/registration
// @access Public
const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.register(req.body);
    // generateToken(res, result);
    res.status(201).json({ data: result });
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
    res.status(200).json({ data: result });
  }
);

// @desc Update User Profile
// route PUT /api/user/profile
// @access Private
const updateUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
  
    const result = await userService.update(req.body);
    generateToken(res, result);
    res.status(200).json({ data: result });
  }
);

// @desc    verify email
// @route   POST /api/user/verify
// @access  private
const verifyUserEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    // const  userId  = req.user.userId;
    // console.log(req.body);
    // const  otp  = req.body.otp.trim();
    const id = req.body.userId as string;
    const otp = req.body.token as string;

    if (!id || !otp) {
      throw new ResponseError(401, "Invalid request");
    }

    const result = await userService.verifyEmail(id, otp);

    res.status(200).json({ data: result });
  }
);

// @desc    forgot password
// @route   POST /api/user/forgot-password
// @access  private
const forgotUserPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const email = req.body.email;

    // const  otp  = req.body.otp.trim();

    const result = await userService.forgotPassword(email);

    res.status(200).json({ data: result });
  }
);

// @desc    reset password
// @route   POST /api/user/reset-password
// @access  private
const resetUserPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const userId = req.user.id;
    // console.log(userId);
    //@ts-ignore
    // console.log(res.body);
    const password = req.body.password;
    // console.log(req.body);

    // const  otp  = req.body.otp.trim();

    const result = await userService.resetPassword(userId, password);
    res.status(200).json({
      data: "Password Reset successful. Please Signin with new password!",
    });
  }
);

// @desc    verify token
// @route   GET /api/user/verify-token
// @access  public
const verifyToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ data: "Token Verified!" });
  }
);

// @desc    get all user
// @route   GET /api/admin/users/
// @access  private/Admin
const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.getAllUsers();
    res.status(200).json({ data: result });
  }
);

// @desc    create user
// @route   POST /api/admin/users/
// @access  private/Admin
const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.createUser(req.body);
    // console.log(result);
    res.status(200).json({ data: result });
  }
);

// @desc    get user by id
// @route   GET /api/admin/user/:id
// @access  private/Admin
const getUserById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.params);
    const result = await userService.getUserById(req.params.id);
    // console.log(result);
    res.status(200).json({ data: result });
  }
);

// @desc    update user by id
// @route   PUT /api/admin/user/:id
// @access  private/Admin
const updateUserById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.params);
    const result = await userService.updateUserById(req.params.id,req.body);
    // console.log(result);
    res.status(200).json({ data: result });
  }
);

// @desc    delete user by id
// @route   DELETE /api/admin/user/:id"
// @access  private/Admin
const deleteUserById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.params);
    const result = await userService.deleteUserById(req.params.id);
    // console.log(result);
    res.status(200).json({ data: result });
  }
);



export default {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  verifyUserEmail,
  forgotUserPassword,
  resetUserPassword,
  getAllUsers,
  verifyToken,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  // register,
  // login,
  // get,
  // update,
  // logout,
};
