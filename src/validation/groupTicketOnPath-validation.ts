import Joi from "joi";

const createGroupTicketOnPathValidation = Joi.object({
  group_ticket_id: Joi.string().trim().max(100).required(),
  ticket_path_id: Joi.string().trim().max(100).required(),
  path_way: Joi.string().trim().required().allow("",null),
  
});

const updateGroupTicketOnPathValidation = Joi.object({
  group_ticket_id: Joi.string().trim().max(100).required().allow("",null),
  ticket_path_id: Joi.string().trim().max(100).required().allow("",null),
  path_way: Joi.string().trim().required().allow("",null).allow("",null),
});

const getGroupTicketOnPathValidation = Joi.object({
  id: Joi.string().trim().max(100).required(),
});

const deleteGroupTicketOnPathValidation = Joi.object({
  id: Joi.string().trim().max(100).required(),
});

export {
  createGroupTicketOnPathValidation,
  deleteGroupTicketOnPathValidation,
  getGroupTicketOnPathValidation,
  updateGroupTicketOnPathValidation,
};
