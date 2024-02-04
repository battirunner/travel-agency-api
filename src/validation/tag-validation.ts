import Joi from "joi";

const createTagValidation = Joi.object({
  title: Joi.string().trim().max(100).required(),

});

const updateTagValidation = Joi.object({
  title: Joi.string().trim().max(100).optional(),
});

const getTagValidation = Joi.string().max(100).required();

export {
  createTagValidation,
  updateTagValidation,
  getTagValidation,
};
