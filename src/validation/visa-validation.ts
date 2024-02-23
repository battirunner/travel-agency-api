import Joi from "joi";

const createVisaValidation = Joi.object({
  title: Joi.string().trim().max(100).optional(),
  details: Joi.string().trim().required(),
  country: Joi.string().trim().max(20).required(),
  validity: Joi.string().trim().required(),
  price: Joi.string().trim().required(),
  min_stay: Joi.string().trim().required(),
  visa_category_id: Joi.string().trim().required(),
});

const updateVisaValidation = Joi.object({
  title: Joi.string().trim().max(100).optional().allow("", null),
  details: Joi.string().trim().required().allow("", null),
  country: Joi.string().trim().max(20).required().allow("", null),
  validity: Joi.string().trim().required().allow("", null),
  price: Joi.string().trim().required().allow("", null),
  min_stay: Joi.string().trim().required().allow("", null),
  visa_category_id: Joi.string().trim().required().allow("", null),
});

const getVisaValidation = Joi.object({
  id: Joi.string().trim().max(100).required(),
});

const deleteVisaValidation = Joi.object({
  id: Joi.string().trim().max(100).required(),
});

export {
  createVisaValidation,
  updateVisaValidation,
  getVisaValidation,
  deleteVisaValidation,
};
