import Joi from "joi";

const registerUserValidation = Joi.object({
  name: Joi.string().trim().max(100).required(),
  email: Joi.string().trim().max(100).required(),
  phone: Joi.string().trim().max(14).required(),
  password: Joi.string().trim().max(20).required(),
  gender: Joi.string().trim().max(10).uppercase().required(),
  agreement: Joi.boolean().required(),
  role: Joi.string().trim().max(10).uppercase().optional(),
});

const registerUserValidationGoogle = Joi.object({
  name: Joi.string().trim().max(100).required(),
  email: Joi.string().trim().max(100).required(),
  // phone: Joi.string().trim().max(14).optional(),
  // password: Joi.string().trim().max(20).optional(),
  // gender: Joi.string().trim().max(10).uppercase().optional(),
  // agreement: Joi.boolean().optional(),
  // role: Joi.string().trim().max(10).uppercase().optional(),
});

const loginUserValidation = Joi.object({
  email: Joi.string().trim().max(100).required(),
  password: Joi.string().trim().max(20).required(),
});

const getUserValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
  id: Joi.string().trim().max(100).required(),
  name: Joi.string().trim().max(100).optional(),
  email: Joi.string().max(100).trim().optional(),
  phone: Joi.string().max(14).optional().trim().optional(),
  password: Joi.string().trim().optional(),
  gender: Joi.string().max(14).optional(),
  agreement: Joi.boolean().optional(),
  role: Joi.string().max(14).optional(),
  profile_pic_url: Joi.string().optional(),
  active: Joi.boolean().optional(),
});

export {
  registerUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
  registerUserValidationGoogle
};
