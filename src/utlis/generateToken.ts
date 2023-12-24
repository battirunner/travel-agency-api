import { Response } from "express";
import jwt from "jsonwebtoken";
const generateToken = (res: Response, user: any) => {
  const userObject = {
    userId: user.id,
    userName: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role || "user",
  };
  const token = jwt.sign(userObject, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  res.cookie(process.env.COOKIE_NAME as string, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    // 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    signed: true,
  });
};

export default generateToken;
