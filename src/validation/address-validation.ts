import Joi from "joi";

const createAddressValidation = Joi.object({
  house_no: Joi.string().max(100).required(),
  street_no: Joi.string().max(100).required(),
  area: Joi.string().max(100).required(),
  thana: Joi.string().max(100).required(),
  district: Joi.string().max(100).required(),
  postal_code: Joi.string().max(10).required(),
  country: Joi.string().max(100).required(),
  user_id: Joi.string().max(100).required(),
});

// const getAddressValidation = Joi.number().min(1).positive().required();
const getAddressValidation = Joi.string().required();

const updateAddressValidation = Joi.object({
  house_no: Joi.string().max(100).optional(),
  street_no: Joi.string().max(100).optional(),
  area: Joi.string().max(100).optional(),
  thana: Joi.string().max(100).optional(),
  district: Joi.string().max(100).optional(),
  postal_code: Joi.string().max(10).optional(),
  country: Joi.string().max(100).optional(),
  user_id: Joi.string().max(100).optional(),
});

// const removeAddressValidation = Joi.number().min(1).positive().required();

// const getListAddressValidation = Joi.number().min(1).positive().required();

export {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
  // removeAddressValidation,
  // getListAddressValidation,
};
