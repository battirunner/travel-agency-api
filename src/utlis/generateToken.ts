import crypto from "crypto";
import { Response } from "express";
import jwt from "jsonwebtoken";
const generateToken = (res: Response, user: any) => {
  // const header = {
  //   alg: "HS256",
  //   typ: "JWT",
  // };

  // const b64Header = toBase64(header);

  // const jwtB64Header = replaceSpecialChars(b64Header);

  // const payload = {
  //   exp: process.env.JWT_EXPIRY,
  //   userId: user.id,
  //   userName: user.name,
  //   email: user.email,
  //   phone: user.phone,
  //   role: user.role || "user",
  // };

  // const b64Payload = toBase64(payload);
  // const jwtB64Payload = replaceSpecialChars(b64Payload);

  // // create your secret to sign the token
  // const secret = process.env.JWT_SECRET;
  // const signature = createSignature(
  //   jwtB64Header,
  //   jwtB64Payload,
  //   secret as string
  // );

  // const jsonWebToken: string = jwtB64Header + '.' + jwtB64Payload + '.' + signature;

  // console.log(jsonWebToken);

  // res.cookie(process.env.COOKIE_NAME as string, jsonWebToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== "development",
  //   sameSite: "strict",
  //   // 30 days
  //   maxAge: 30 * 24 * 60 * 60 * 1000,
  //   signed: true,
  // });

  // converts the obj to a string using JSON.stringify()
  // then string converted to base64 using Buffer.from(string).toString('base64')
  // then any of the characters =,+ or / and replace them with their // substitutes using replaceSpecialChars function
  const userObject = {
    userId: user.id,
    userName: user.name,
    email: user.email,
    // phone: user.phone,
    // role: user.role || "user",
  };

  const token = jwt.sign(userObject, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  res.cookie(process.env.COOKIE_NAME as string, token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV !== "development",
    // sameSite: "strict",
    sameSite: "none",
    secure: true,
    // 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    signed: true,
  });
};

// const toBase64 = (obj: object) => {
//   // converts the obj to a string
//   const str = JSON.stringify(obj);
//   // returns string converted to base64
//   return Buffer.from(str).toString("base64");
// };

// const replaceSpecialChars = (b64string: string) => {
//   // create a regex to match any of the characters =,+ or / and replace them with their // substitutes
//   return b64string.replace(/[=+/]/g, (charToBeReplaced) => {
//     switch (charToBeReplaced) {
//       case "=":
//         return "";
//       case "+":
//         return "-";
//       case "/":
//         return "_";
//       default:
//         return charToBeReplaced;
//     }
//   });
// };

// const createSignature = (
//   jwtB64Header: string,
//   jwtB64Payload: string,
//   secret: string
// ): string => {
//   // create a HMAC(hash based message authentication code) using sha256 hashing alg
//   let signature: crypto.Hmac = crypto.createHmac("sha256", secret);

//   // use the update method to hash a string formed from our jwtB64Header a period and
//   //jwtB64Payload
//   signature.update(jwtB64Header + "." + jwtB64Payload);

//   //signature needs to be converted to base64 to make it usable
//   const signatureString = replaceSpecialChars(signature.digest("base64"));

//   //of course we need to clean the base64 string of URL special characters
//   // signature = replaceSpecialChars(signature);
//   return signatureString;
// };

export default generateToken;
