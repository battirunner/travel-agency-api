// import Joi from "joi";

// const createGroupTicketValidation = Joi.object({
//   start_place: Joi.string().trim().max(100).required(),
//   end_place: Joi.string().trim().max(100).required(),
//   price: Joi.string().trim().max(100).required(),
//   show_price: Joi.boolean().required(),
//   food: Joi.boolean().required(),
//   baggage: Joi.string().trim().required(),
//   policy: Joi.string().trim().required(),
//   country: Joi.string().trim().required(),
// });

// const updateGroupTicketValidation = Joi.object({
//   start_place: Joi.string().trim().max(100).required().allow("", null),
//   end_place: Joi.string().trim().max(100).required().allow("", null),
//   price: Joi.string().trim().max(100).required().allow("", null),
//   show_price: Joi.boolean().required().allow("", null),
//   food: Joi.boolean().required().allow("", null),
//   baggage: Joi.string().trim().required().allow("", null),
//   policy: Joi.string().trim().required().allow("", null),
// });

// const getGroupTicketValidation = Joi.string().trim().max(100).required();

// const deleteGroupTicketValidation = Joi.string().trim().max(100).required();

// export {
//   createGroupTicketValidation,
//   deleteGroupTicketValidation,
//   getGroupTicketValidation,
//   updateGroupTicketValidation,
// };
