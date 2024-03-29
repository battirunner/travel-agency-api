import Joi from "joi";

const createTourTypeValidation = Joi.object({
  title: Joi.string().trim().max(100).required(),
  details: Joi.string().trim().optional().allow("",null),
});

const updateTourTypeValidation = Joi.object({
  title: Joi.string().trim().max(100).optional(),
  details: Joi.string().trim().optional().allow("",null),
});

const getTourTypeValidation = Joi.string().max(100).required();

export {
  createTourTypeValidation,
  updateTourTypeValidation,
  getTourTypeValidation,
};
