import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from "../validation/user-validation";
import { validate } from "../validation/validation";
// import generateToken from "../utlis/generateToken";

interface DataRegister {
  // username: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  agreement: boolean;
  role?: string;
  password: string;
}
interface DataLogin {
  email: string;
  password: string;
}

// register user service
const register = async (reqData: DataRegister) => {
  const user = validate(registerUserValidation, reqData);

  const countUser: number = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "User already exists");
  }

  user.password = await bcrypt.hash(user.password, 10);
  const result = await prismaClient.user.create({
    data: user,
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  return result;
};

// login user service
const login = async (reqData: DataLogin) => {
  const loginRequest = validate(loginUserValidation, reqData);

  const user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Invalid email or password");
  }

  const passwordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (!passwordValid) {
    throw new ResponseError(401, "Email or password wrong");
  }
  const result = { id: user.id, email: user.email, name: user.name };
  // const token = uuid().toString();

  // const result = await prismaClient.user.update({
  //   data: {
  //     token: token,
  //   },
  //   where: {
  //     username: user.username,
  //   },
  //   select: {
  //     token: true,
  //   },
  // });

  return result;
};

// get user profile
const get = async (userId: string) => {
  userId = validate(getUserValidation, userId);

  const user = await prismaClient.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  return user;
};

type DataUpdate = {
  // id: string | null;
  name: string | null;
  password: string | null;
  email: string | null;
  phone: string | null;
};

const update = async (reqData: DataUpdate) => {
  // console.log(reqData);
  const user = validate(updateUserValidation, reqData);

  const userInDatabase = await prismaClient.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!userInDatabase) {
    throw new ResponseError(404, "User not found!");
  }

  const data = {} as {
    name: string;
    password: string;
    email: string;
    phone: string;
  };

  if (userInDatabase) {
    data.name = user.name || userInDatabase.name;
    data.phone = user.phone || userInDatabase.phone;
    data.email = user.email || userInDatabase.email;
  }

  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  const result = await prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: data,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
    },
  });

  return result;
};

// const logout = async (username: string) => {
//   username = validate(getUserValidation, username);

//   const user = await prismaClient.user.findUnique({
//     where: {
//       username: username,
//     },
//   });

//   if (!user) {
//     throw new ResponseError(404, "user is not found");
//   }

//   const result = await prismaClient.user.update({
//     where: {
//       username: username,
//     },
//     data: {
//       token: null,
//     },
//     select: {
//       username: true,
//     },
//   });

//   return result;
// };

export default {
  register,
  login,
  get,
  update,
  // logout,
};
