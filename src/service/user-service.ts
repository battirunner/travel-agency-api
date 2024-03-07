import axios from "axios";
import bcrypt from "bcrypt";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { createRandomBytes } from "../utils/helper";
import {
  confirmationTemplate,
  generateOtp,
  mailTransport,
  passwordResetTemplate,
  verifyEmailTemplate,
} from "../utils/mail";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  registerUserValidationGoogle,
  updateUserValidation,
} from "../validation/user-validation";
import { validate } from "../validation/validation";
// import addressService from "./address-service";

interface DataRegister {
  // username: string;
  name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  agreement?: boolean;
  role?: string;
  password?: string;
  googleAccessToken?: string;
  fbAccessToken?: string;
  fbUserId?: string;
}
interface DataLogin {
  email?: string;
  password?: string;
  googleAccessToken?: string;
  fbAccessToken?: string;
  fbUserId?: string;
}

type DataUpdate = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  dob?: string;
  address?: string;
  postal_code?: string;
  district?: string;
  country?: string;
  passport_no?: string;
  passport_exp_date?: string;
  passport_img_url?: string;
  visa_img_url?: string;
  agreement?: boolean;
  role?: string;
  password?: string;
  profile_pic_url?: string;
  active?: boolean;
};
// register user service
const register = async (reqData: DataRegister) => {
  //fb user
  if (reqData.fbAccessToken && reqData.fbUserId) {
    const response = await axios.get(
      `https://graph.facebook.com/v19.0/${reqData.fbUserId}?fields=id,name,email&access_token=${reqData.fbAccessToken}`
    );

    if (response) {
      const name: string = response.data.name;
      const email: string = response.data.email;
      const user = validate(registerUserValidationGoogle, { name, email });

      const countUser: number = await prismaClient.user.count({
        where: {
          email: user.email,
        },
      });

      if (countUser === 1) {
        // console.log("user exist");
        throw new ResponseError(400, "User already exists");
      }

      // email verified set to true
      user.emailVerified = true;

      const result = await prismaClient.user.create({
        data: user,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      // create empty address
      // const userAddress = await prismaClient.address.create({
      //   data: { user_id: result.id },
      // });
      // const userAddress = await addressService.createAddress({
      //   user_id: result.id,
      // });

      // console.log("from registered user");
      // console.log(result);
      return result;
    } else {
      throw new ResponseError(400, "Invalid access token!");
    }
    // google user
  } else if (reqData.googleAccessToken) {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${reqData.googleAccessToken}`,
        },
      }
    );

    if (response) {
      const name: string = response.data.name;
      const email: string = response.data.email;
      const user = validate(registerUserValidationGoogle, { name, email });

      const countUser: number = await prismaClient.user.count({
        where: {
          email: user.email,
        },
      });

      if (countUser === 1) {
        // console.log("user exist");
        throw new ResponseError(400, "User already exists");
      }

      user.emailVerified = true;
      const result = await prismaClient.user.create({
        data: user,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      // create empty address
      // const userAddress = await prismaClient.address.create({
      //   data: { user_id: result.id },
      // });
      // const userAddress = await addressService.createAddress({
      //   user_id: result.id,
      // });

      // console.log("from registered user");
      // console.log(result);
      return result;
    } else {
      throw new ResponseError(400, "Invalid access token!");
    }
    // normal user
  } else {
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

    // create new user
    const result = await prismaClient.user.create({
      data: user,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    // create empty address
    // const userAddress = await addressService.createAddress({
    //   user_id: result.id,
    // });

    // generate otp
    const otp = String(generateOtp());
    const hashedOtp = await bcrypt.hash(otp, 10);

    const verificationTokenObject = {
      user_id: result.id,
      token: hashedOtp,
    };

    //save otp
    const verificationToken = await prismaClient.verificationToken.create({
      data: verificationTokenObject,
      select: {
        id: true,
        user_id: true,
        token: true,
        // createdAt: true,
      },
    });

    // send otp in email
    mailTransport().sendMail({
      from: "email@example.com",
      to: result.email,
      subject: "Verify your email",
      html: verifyEmailTemplate(result.id, otp),
    });

    return "Signedup successfully! Please verify your email before logging in! Please check your email!";
  }
};

// login user service
const login = async (reqData: DataLogin) => {
  //fb login
  if (reqData.fbAccessToken && reqData.fbUserId) {
    const response = await axios.get(
      `https://graph.facebook.com/v19.0/${reqData.fbUserId}?fields=id,name,email&access_token=${reqData.fbAccessToken}`
    );
    // console.log(response);
    if (response) {
      const email = response.data.email;
      const user = { email };

      const existUser = await prismaClient.user.findUnique({
        where: {
          email: user.email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      if (!existUser) {
        const newUser = await register(reqData);
        // console.log("from login service");
        // console.log(newUser);
        return newUser;
        // throw new ResponseError(400, "User don't exists");
      } else {
        return existUser;
      }
    } else {
      throw new ResponseError(400, "Invalid access token!");
    }
    //google login
  } else if (reqData.googleAccessToken) {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${reqData.googleAccessToken}`,
        },
      }
    );
    if (response) {
      const email = response.data.email;
      const user = { email };

      const existUser = await prismaClient.user.findUnique({
        where: {
          email: user.email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      if (!existUser) {
        const newUser = await register(reqData);
        // console.log("from login service");
        // console.log(newUser);
        return newUser;
        // throw new ResponseError(400, "User don't exists");
      } else {
        return existUser;
      }
    } else {
      throw new ResponseError(400, "Invalid access token!");
    }
    // normal login
  } else {
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
        emailVerified: true,
        role: true,
      },
    });

    if (!user) {
      throw new ResponseError(401, "Invalid email or password");
    }

    if (!user.emailVerified) {
      throw new ResponseError(401, "Please verify your email first!");
    }

    const passwordValid = await bcrypt.compare(
      loginRequest.password,
      user.password as string
    );

    if (!passwordValid) {
      throw new ResponseError(401, "Invalid email or password");
    }
    const result = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return result;
  }
};

//login admin

const loginAdmin = async (reqData: DataLogin) => {
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
      emailVerified: true,
      role: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Invalid email or password");
  }

  if (!user.emailVerified) {
    throw new ResponseError(401, "Please verify your email first!");
  }

  if (user.role === "USER") {
    throw new ResponseError(401, "Invalid email or password");
  }

  const passwordValid = await bcrypt.compare(
    loginRequest.password,
    user.password as string
  );

  if (!passwordValid) {
    throw new ResponseError(401, "Invalid email or password");
  }
  const result = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

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
      gender: true,
      agreement: true,
      address: true,
      postal_code: true,
      district: true,
      country: true,
      passport_no: true,
      passport_exp_date: true,
      passport_img_url: true,
      visa_img_url: true,
      role: true,
      profile_pic_url: true,
      active: true,
      // emailVerified: true,
      dob: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  return user;
};

// update user profile
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

  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  const result = await prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: user,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      gender: true,
      agreement: true,
      address: true,
      postal_code: true,
      district: true,
      country: true,
      passport_no: true,
      passport_exp_date: true,
      passport_img_url: true,
      visa_img_url: true,
      role: true,
      profile_pic_url: true,
      active: true,
      // emailVerified: true,
      dob: true,
    },
  });

  return result;
};

// delete user profile
const deleteUser = async (userId: string) => {
  userId = validate(getUserValidation, userId);

  const userInDatabase = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!userInDatabase) {
    throw new ResponseError(404, "User not found!");
  }

  const result = await prismaClient.user.delete({
    where: {
      id: userId,
    },
  });

  return result;
};

// verify user email
const verifyEmail = async (userId: string, otp: string) => {
  const existUser = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
    },
  });

  if (!existUser) {
    throw new ResponseError(400, "User not found");
  }
  if (existUser.emailVerified) {
    throw new ResponseError(400, "Email already verified");
  }
  const tokenObj = await prismaClient.verificationToken.findUnique({
    where: {
      user_id: existUser.id,
    },
    select: {
      token: true,
    },
  });

  if (!tokenObj) throw new ResponseError(401, "Invalid User");

  const validToken = await bcrypt.compare(otp, tokenObj.token);

  if (!validToken) {
    throw new ResponseError(401, "Invalid OTP");
  }

  existUser.emailVerified = true;

  const deleteToken = await prismaClient.verificationToken.delete({
    where: { user_id: existUser.id },
  });

  const updateUser = await prismaClient.user.update({
    where: { id: existUser.id },
    data: { ...existUser },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  //send confirmation email notification
  mailTransport().sendMail({
    from: "email@example.com",
    to: updateUser.email,
    subject: "Congratulations!",
    html: confirmationTemplate("Email Verified Successfully", "Thank You!"),
  });
  return "Email Verified Successfully!";
};

// forgot password
const forgotPassword = async (email: string) => {
  if (!email) throw new ResponseError(401, "Invalid Request");

  const existUser = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!existUser) {
    throw new ResponseError(400, `Password Reset Link sent to your email`);
  }

  const tokenObj = await prismaClient.resetPasswordToken.findUnique({
    where: {
      user_id: existUser.id,
      // token: token,
    },
    select: {
      id: true,
      token: true,
    },
  });

  if (tokenObj) {
    throw new ResponseError(
      400,
      "Only after one hour you can request for another token!"
    );
  }

  const token = await createRandomBytes();
  const tokenString = await bcrypt.hash(token as string, 10);
  const newTokenObj = { user_id: existUser.id, token: tokenString };
  const resetToken = await prismaClient.resetPasswordToken.create({
    data: newTokenObj,
  });

  //send confirmation email notification
  mailTransport().sendMail({
    from: "email@example.com",
    to: existUser.email,
    subject: "Password Reset",
    html: passwordResetTemplate(
      `${process.env.FRONTEND_BASE_URL}/reset-password/?token=${token}&id=${existUser.id}`
    ),
  });

  return "Password Reset Link sent to your email";
};

// reset password
const resetPassword = async (userId: string, password: string) => {
  const existUser = await prismaClient.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
    },
  });
  if (!existUser) {
    throw new ResponseError(404, "User not found");
  }
  // console.log( password);
  const isSamePassword = await bcrypt.compare(
    password as string,
    existUser.password as string
  );

  if (isSamePassword) {
    throw new ResponseError(
      401,
      "New Password must Be different from old password!"
    );
  }

  if (password.trim().length < 7 || password.trim().length > 20) {
    throw new ResponseError(
      401,
      "Password must be between 8 and 20 characters"
    );
  }

  existUser.password = await bcrypt.hash(password, 10);

  const updateUser = await prismaClient.user.update({
    where: { id: existUser.id },
    data: { ...existUser },
    select: { id: true, name: true, email: true },
  });

  // console.log(updateUser);
  await prismaClient.resetPasswordToken.delete({
    where: { user_id: updateUser.id },
  });

  //send confirmation email notification
  mailTransport().sendMail({
    from: "email@example.com",
    to: updateUser.email,
    subject: "Password Reset Successfully",
    html: confirmationTemplate(
      "Email Verified Successfully",
      "Now you can login with new password"
    ),
  });

  return "Password Reset Successfully!";
};

//get all users(admin only)
const getAllUsers = async () => {
  const users = await prismaClient.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      gender: true,
      agreement: true,
      role: true,
      profile_pic_url: true,
      active: true,
      emailVerified: true,
      address: true,
    },
    // include:{
    //   address:true,
    // }
  });
  return users;
};

// create user (admin only)
const createUser = async (reqData: DataRegister) => {
  const result = await register(reqData);
  return result;
  // const user = validate(registerUserValidation, reqData);

  // const countUser = await prismaClient.user.count({
  //   where: {
  //     email: user.email,
  //   },
  // });

  // if (countUser === 1) {
  //   throw new ResponseError(400, "User already exists");
  // }
  // user.password = await bcrypt.hash(user.password, 10);
  // user.emailVerified = true;

  // const result = await prismaClient.user.create({
  //   data: user,
  //   select: {
  //     id: true,
  //     name: true,
  //     email: true,
  //     phone: true,
  //     gender: true,
  //     agreement: true,
  //     role: true,
  //     profile_pic_url: true,
  //     active: true,
  //     emailVerified: true,
  //     address: true,
  //   },
  // });

  // // create empty address
  // const userAddress = await addressService.createAddress({
  //   user_id: result.id,
  // });

  // return result;
};

// get user by id (admin only)
const getUserById = async (userId: string) => {
  // userId = validate(getUserValidation, userId);
  const user = await get(userId);
  return user;
};

// update user by id (admin only)
const updateUserById = async (userId: string, reqData: DataUpdate) => {
  // userId = validate(getUserValidation, userId);
  reqData.id = userId;
  const user = await update(reqData);
  return user;
};

// delete user by id (admin only)
const deleteUserById = async (userId: string) => {
  // userId = validate(getUserValidation, userId);
  const user = await deleteUser(userId);
  return "Deleted!";
};

export default {
  register,
  login,
  loginAdmin,
  get,
  update,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
