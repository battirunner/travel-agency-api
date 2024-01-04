import Joi from "joi";

const createTourPackageValidation = Joi.object({
  title: Joi.string().trim().max(100).required(),
  description: Joi.string().trim().required(),
  duration: Joi.number().positive().required(),
  start_datetime: Joi.date().required(),
  end_datetime: Joi.date().min(Joi.ref("start_datetime")).required(),
  price: Joi.string().trim().max(100).required(),
  tour_type_id: Joi.string().trim().optional(),
  terms_conditions: Joi.string().required(),
  other_details: Joi.string().optional(),
  visa_Category_id: Joi.string().trim().optional(),
  location_id: Joi.string().trim().optional(),
});

const updateTourPackageValidation = Joi.object({
  title: Joi.string().trim().max(100).optional(),
  description: Joi.string().trim().optional(),
  duration: Joi.number().positive().optional(),
  start_datetime: Joi.date().optional(),
  end_datetime: Joi.date().min(Joi.ref("start_datetime")).optional(),
  price: Joi.string().trim().max(100).optional(),
  tour_type_id: Joi.string().trim().optional(),
  terms_conditions: Joi.string().optional(),
  other_details: Joi.string().optional(),
  visa_Category_id: Joi.string().trim().optional(),
  location_id: Joi.string().trim().optional(),
});

const getTourPackageValidation = Joi.string().max(100).required();

export {
  createTourPackageValidation,
  updateTourPackageValidation,
  getTourPackageValidation,
};
