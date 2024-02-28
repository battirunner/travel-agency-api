import Joi from "joi";

const getCountryValidation = Joi.string().required();

const createCountryValidation = Joi.object({
    name: Joi.string().required(),
    iso_code: Joi.string().required(),
})

const updateCountryValidation = Joi.object({
    name: Joi.string().required(),
    iso_code: Joi.string().required().allow("",null),
})

export { getCountryValidation, createCountryValidation, updateCountryValidation };