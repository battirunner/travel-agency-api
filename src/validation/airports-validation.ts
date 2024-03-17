import Joi from "joi";

const getAirportsValidation = Joi.string().required();

const createAirportsValidation = Joi.object({
  name: Joi.string().required(),
  iata_code: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

const updateAirportsValidation = Joi.object({
  name: Joi.string().required(),
  iata_code: Joi.string().required().allow("", null),
  city: Joi.string().required().allow("", null),
  country: Joi.string().required().allow("", null),
});

export {
  createAirportsValidation,
  getAirportsValidation,
  updateAirportsValidation,
};
