import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ResponseError } from "../error/response-error";
import contactFormService from "../service/contactForm-service";

// @desc    submit contact form
// @route  POST /api/contact-form-info
// @access Public

const submitContactForm = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const reqData: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    } = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      subject: req.body.subject,
      message: req.body.message,
    };
    const result = await contactFormService.submitContactForm(reqData);
    res.status(200).json({ data: result });
  }
);

export default { submitContactForm };
