import Joi from "joi";

const createVisaCategoryValidation = Joi.object({
  title: Joi.string().trim().max(100).required(),
  details: Joi.string().trim().optional().allow("",null),
});

const updateVisaCategoryValidation = Joi.object({
  title: Joi.string().trim().max(100).optional(),
  details: Joi.string().trim().optional().allow("",null),
});

const getVisaCategoryValidation = Joi.string().max(100).required();

export {
  createVisaCategoryValidation,
  updateVisaCategoryValidation,
  getVisaCategoryValidation,
};
