import Joi from "joi";

const createGroupTicketValidation = Joi.object({
  ticket_path: Joi.string().trim().required(),
  price: Joi.string().trim().max(100).required(),
  show_price: Joi.boolean().required(),
  food: Joi.boolean().required(),
  baggage: Joi.string().trim().required(),
  policy: Joi.string().trim().required(),
  refund: Joi.boolean().required(),
  available_seats: Joi.number().required(),
  // request_wheel_chair: Joi.boolean().required(),
});

const updateGroupTicketValidation = Joi.object({
  ticket_path: Joi.string().trim().required().allow("", null),
  price: Joi.string().trim().max(100).required().allow("", null),
  show_price: Joi.boolean().required().allow("", null),
  food: Joi.boolean().required().allow("", null),
  baggage: Joi.string().trim().required().allow("", null),
  policy: Joi.string().trim().required().allow("", null),
  refund: Joi.boolean().required().allow("", null),
  available_seats: Joi.number().required().allow("", null),
  // request_wheel_chair: Joi.boolean().required().allow("", null),
});

const getGroupTicketValidation = Joi.string().trim().max(100).required();

const deleteGroupTicketValidation = Joi.string().trim().max(100).required();

export {
  createGroupTicketValidation,
  deleteGroupTicketValidation,
  getGroupTicketValidation,
  updateGroupTicketValidation,
};
