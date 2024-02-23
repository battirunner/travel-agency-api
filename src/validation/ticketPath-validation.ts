import Joi from "joi";

const createTicketPathValidation = Joi.object({
  departure_place: Joi.string().trim().max(100).required(),
  departure_airport: Joi.string().trim().max(100).required(),
  departure_airlines: Joi.string().trim().max(100).required(),
  departure_aircraft: Joi.string().trim().max(100).required(),
  departure_datetime: Joi.date().required(),
  arrival_place: Joi.string().trim().max(100).required(),
  arrival_airport: Joi.string().trim().max(100).required(),
  arrival_airlines: Joi.string().trim().max(100).required(),
  arrival_aircraft: Joi.string().trim().max(100).required(),
  arrival_datetime: Joi.date().min(Joi.ref("departure_datetime")).required(),
});

const updateTicketPathValidation = Joi.object({
  departure_place: Joi.string().trim().max(100).required(),
  departure_airport: Joi.string().trim().max(100).required(),
  departure_airlines: Joi.string().trim().max(100).required(),
  departure_aircraft: Joi.string().trim().max(100).required(),
  departure_datetime: Joi.date().required(),
  arrival_place: Joi.string().trim().max(100).required(),
  arrival_airport: Joi.string().trim().max(100).required(),
  arrival_airlines: Joi.string().trim().max(100).required(),
  arrival_aircraft: Joi.string().trim().max(100).required(),
  arrival_datetime: Joi.date().min(Joi.ref("departure_datetime")).required(),
});

const getTicketPathValidation = Joi.object({
  id: Joi.string().trim().max(100).required(),
});

const deleteTicketPathValidation = Joi.object({
  id: Joi.string().trim().max(100).required(),
});

export {
  createTicketPathValidation,
  deleteTicketPathValidation,
  getTicketPathValidation,
  updateTicketPathValidation,
};
