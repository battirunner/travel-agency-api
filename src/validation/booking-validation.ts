import Joi from "joi";

const createBookingValidation = Joi.object({
  user_id: Joi.string().trim().max(100).optional(),
  booking_user_contact: Joi.string().required(),
  booking_user_address: Joi.string().required(),
  booking_user_notes: Joi.string().optional(),
  booking_item_type: Joi.string().required(),
  booking_item_id: Joi.string().trim().max(100).required(),
  booking_informations: Joi.string().trim().required(),
  payment_status: Joi.string().trim().required(),
  approval_status: Joi.string().trim().required(),
});
const updateBookingValidation = Joi.object({
  user_id: Joi.string().trim().max(100).optional(),
  booking_user_contact: Joi.string().optional(),
  booking_user_address: Joi.string().optional(),
  booking_user_notes: Joi.string().optional(),
  booking_item_type: Joi.string().optional(),
  booking_item_id: Joi.string().trim().max(100).optional(),
  booking_informations: Joi.string().trim().optional(),
  payment_status: Joi.string().trim().optional(),
  approval_status: Joi.string().trim().optional(),
});
const getBookingValidation = Joi.object({
  id: Joi.string().trim().max(100).required(),
});

const getBookingByUserValidation = Joi.object({
  user_id: Joi.string().trim().max(100).required(),
});

const deleteBookingValidation = Joi.object({
  id: Joi.string().trim().max(100).required(),
});

export {
  createBookingValidation,
  deleteBookingValidation,
  getBookingByUserValidation,
  getBookingValidation,
  updateBookingValidation,
};
