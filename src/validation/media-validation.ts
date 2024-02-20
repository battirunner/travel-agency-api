import Joi from "joi";

const createMediaValidation = Joi.object({
  uri: Joi.string().trim().required(),
  type: Joi.string().trim().required(),
  tour_package_id: Joi.string().trim().optional().allow("",null),
});

const updateMediaValidation = Joi.object({
    uri: Joi.string().trim().optional().allow("",null),
    type: Joi.string().trim().optional().allow("",null),
    tour_package_id: Joi.string().trim().optional().allow("",null),
});

const getMediaValidation = Joi.string().required();

export {
  createMediaValidation,
  updateMediaValidation,
  getMediaValidation,
};
