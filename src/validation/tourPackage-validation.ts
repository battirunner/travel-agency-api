import Joi from "joi";

const createTourPackageValidation = Joi.object({
  title: Joi.string().trim().max(100).required(),
  description: Joi.string().trim().required(),
  duration: Joi.string().required(),
  guests: Joi.number().positive().required().allow(null),
  // start_datetime: Joi.date().required(),
  // end_datetime: Joi.date().min(Joi.ref("start_datetime")).required(),
  start_datetime: Joi.string().required(),
  end_datetime: Joi.string().required(),
  price: Joi.string().trim().max(100).required(),
  included: Joi.string().trim().max(100).required(),
  not_included: Joi.string().trim().max(100).required(),
  tour_type_id: Joi.string().trim().optional().allow("",null),
  departure_location: Joi.string().trim().max(100).required(),
  map_url: Joi.string().trim().optional().allow("",null),
  terms_conditions: Joi.string().required(),
  other_details: Joi.string().optional().allow("",null),
  visa_Category_id: Joi.string().trim().optional().allow("",null),
  location_id: Joi.string().trim().optional().allow("",null),
});

const updateTourPackageValidation = Joi.object({
  title: Joi.string().trim().max(100).optional().allow("",null),
  description: Joi.string().trim().optional().allow("",null),
  duration: Joi.string().optional().allow("",null),
  guests: Joi.number().optional().allow("",null),
  // start_datetime: Joi.date().optional().allow("",null),
  // end_datetime: Joi.date().min(Joi.ref("start_datetime")).optional().allow("",null),
  start_datetime: Joi.string().required(),
  end_datetime: Joi.string().required(),
  price: Joi.string().trim().max(100).optional().allow("",null),
  included: Joi.string().trim().max(100).optional().allow("",null),
  not_included: Joi.string().trim().max(100).optional().allow("",null),
  tour_type_id: Joi.string().trim().optional().allow("",null),
  departure_location: Joi.string().trim().max(100).optional().allow("",null),
  map_url: Joi.string().trim().optional().allow("",null),
  terms_conditions: Joi.string().optional().allow("",null),
  other_details: Joi.string().optional().allow("",null),
  visa_Category_id: Joi.string().trim().optional().allow("",null),
  location_id: Joi.string().trim().optional().allow("",null),
});

const getTourPackageValidation = Joi.string().max(100).required();

export {
  createTourPackageValidation,
  updateTourPackageValidation,
  getTourPackageValidation,
};
