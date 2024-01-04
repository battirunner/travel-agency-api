import Joi from "joi";

const createMediaValidation = Joi.object({
  uri: Joi.string().trim().required(),
  type: Joi.string().trim().required(),
  tour_package_id: Joi.string().trim().optional(),
});

const updateMediaValidation = Joi.object({
    uri: Joi.string().trim().optional(),
    type: Joi.string().trim().optional(),
    tour_package_id: Joi.string().trim().optional(),
});

const getMediaValidation = Joi.string().required();

export {
  createMediaValidation,
  updateMediaValidation,
  getMediaValidation,
};
