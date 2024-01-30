import Joi from "joi";

const createLocationValidation = Joi.object({
  name: Joi.string().trim().max(100).required(),
  type: Joi.string().trim().max(50).required(),

});

const updateLocationValidation = Joi.object({
    name: Joi.string().trim().max(100).optional(),
    type: Joi.string().trim().max(50).optional(),
});

const getLocationValidation = Joi.string().max(100).required();

export {
  createLocationValidation,
  updateLocationValidation,
  getLocationValidation,
};
