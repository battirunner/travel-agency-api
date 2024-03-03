import Joi from "joi";

const createInsuranceValidation = Joi.object({
  category_id: Joi.string().trim().max(100).optional(),
  title: Joi.string().trim().max(100).required(),
  details: Joi.string().trim().required(),
  country: Joi.string().trim().max(20).required(),
  duration: Joi.string().trim().max(100).required(),
  price: Joi.string().required(),
});

const updateInsuranceValidation = Joi.object({
  category_id: Joi.string().trim().max(100).optional().allow("", null),
  title: Joi.string().trim().max(100).optional().allow("", null),
  details: Joi.string().trim().optional().allow("", null),
  country: Joi.string().trim().max(20).optional().allow("", null),
  duration: Joi.string().trim().max(100).optional().allow("", null),
  price: Joi.string().optional().allow("", null),
});

const getInsuranceValidation = Joi.string().trim().max(100).required();

const deleteInsuranceValidation = Joi.string().trim().max(100).required();

export {
  createInsuranceValidation,
  deleteInsuranceValidation,
  getInsuranceValidation,
  updateInsuranceValidation,
};
