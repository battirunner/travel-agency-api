// import Joi from "joi";

// const createTicketPathValidation = Joi.object({
//   departure_place: Joi.string().trim().max(100).required(),
//   departure_airport: Joi.string().trim().max(100).required(),
//   airlines: Joi.string().trim().max(100).required(),
//   aircraft: Joi.string().trim().max(100).required(),
//   departure_datetime: Joi.string().required(),
//   arrival_place: Joi.string().trim().max(100).required(),
//   arrival_airport: Joi.string().trim().max(100).required(),
//   arrival_datetime: Joi.string().trim().required(),
// });

// const updateTicketPathValidation = Joi.object({
//   departure_place: Joi.string().trim().max(100).required(),
//   departure_airport: Joi.string().trim().max(100).required(),
//   airlines: Joi.string().trim().max(100).required(),
//   aircraft: Joi.string().trim().max(100).required(),
//   departure_datetime: Joi.string().required(),
//   arrival_place: Joi.string().trim().max(100).required(),
//   arrival_airport: Joi.string().trim().max(100).required(),
//   arrival_datetime: Joi.string().trim().required(),
// });

// const getTicketPathValidation = Joi.string().trim().max(100).required();

// const deleteTicketPathValidation = Joi.string().trim().max(100).required();

// export {
//   createTicketPathValidation,
//   deleteTicketPathValidation,
//   getTicketPathValidation,
//   updateTicketPathValidation,
// };
