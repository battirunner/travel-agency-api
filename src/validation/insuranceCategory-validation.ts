import Joi from "joi";

const createInsuranceCategoryValidation = Joi.object({
  title: Joi.string().trim().max(100).required(),
  details: Joi.string().trim().optional().allow("",null),
});

const updateInsuranceCategoryValidation = Joi.object({
  title: Joi.string().trim().max(100).optional().allow("",null),
  details: Joi.string().trim().optional().allow("",null),
});

const getInsuranceCategoryValidation = Joi.string().max(100).required();

export {
  createInsuranceCategoryValidation,
  getInsuranceCategoryValidation,
  updateInsuranceCategoryValidation,
};
