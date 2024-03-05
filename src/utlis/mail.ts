import nodemailer from "nodemailer";
function generateOtp() {
  return Math.floor(Math.random() * 900000 + 100000);
}

function mailTransport() {
  return nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });
}

function verifyEmailTemplate(id:string, code: string) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <style>
  @media only screen and (min-width:620px){
      h1{
          font-size: 30px;
          padding:5px;
      }
  }
  </style>
  </head>
  <body>
  <div style="max-width:620px;margin:0 auto; font-family:sans-serif; color:#272727;">
  <h1 style="background:#f6f6f6; padding:10px;text-align:center;color:#272727;">We are delighted to welcome you to our service!</h1>
  <p>Please Verify Your Email Tp Continue Your verification code is:</p>
  <p>Please Visit the link: <a href="${process.env.FRONTEND_BASE_URL}/verify-email?userId=${id}&token=${code}" target="_blank" rel="noopener noreferrer"> Verify Email</a></p>
  </div>
  </body>`;
}

function confirmationTemplate(heading: string, message: string) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style>
    @media only screen and (min-width:620px){
        h1{
            font-size: 30px;
            padding:5px;
        }
    }
    </style>
    </head>
    <body>
    <div style="max-width:620px;margin:0 auto; font-family:sans-serif; color:#272727;">
    <h1 style="background:#f6f6f6; padding:10px;text-align:center;color:#272727;">${heading}</h1>
    <p style="width:80px;margin:0 auto; font-weight:bold; text-align:center; background:#f6f6f6; border-radius:5px">${message}</p>
    </div>
    </body>`;
  }

  function passwordResetTemplate(url: string, ) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style>
    @media only screen and (min-width:620px){
        h1{
            font-size: 30px;
            padding:5px;
        }
    }
    </style>
    </head>
    <body>
    <div style="max-width:620px;margin:0 auto; font-family:sans-serif; color:#272727;">
    <h1 style="background:#f6f6f6; padding:10px;text-align:center;color:#272727;">Response to your reset password request</h1>
    <p style="width:80px;margin:0 auto; font-weight:bold; text-align:center; background:#f6f6f6; border-radius:5px">Please visit the link below to reset password</p>
    <div style="text-align:center;">
    <a href="${url}" target="_blank" rel="noopener noreferrer" style="font-family:sans-serif; margin:0 auto; padding: 20px; text-align:center; background: #e63946; border-radius: 5px; font-size: 20px 10px; color: #fff; cursor: pointer; text-decoration:none; display: inline-block;">Reset Password</a>
    </div>
    </div>
    </body>`;
  }
export { generateOtp, mailTransport, verifyEmailTemplate,confirmationTemplate,passwordResetTemplate };
