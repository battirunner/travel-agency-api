import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  createGroupTicketValidation,
  getGroupTicketValidation,
  updateGroupTicketValidation,
} from "../validation/groupTicket-validation";
// import groupTicketOnPathService from "./groupTicketOnPath-service";
import { validate } from "../validation/validation";

interface DataRegister {
  ticket_path: string;
  price: string;
  show_price: boolean;
  food: boolean;
  baggage: string;
  policy: string;
  refund: string;
  available_seats: number;
  request_wheel_chair: boolean;
}

// create GroupTicket service
const createGroupTicket = async (groupTicketData: DataRegister) => {
  const GroupTicket = validate(createGroupTicketValidation, groupTicketData);

  const GroupTicketResult = await prismaClient.group_ticket.create({
    data: GroupTicket,
  });

  return {
    GroupTicketResult,
  };
};

// get GroupTicket
const getGroupTicket = async (
  country: string,
  from: string,
  to: string,
  start_date: string,
  end_date: string,
  page: number,
  limit: number
) => {
  const count = await prismaClient.group_ticket.count({
    where: {
      OR: [
        {
          ticket_path: {
            contains: country || from || to || start_date || end_date,
          },
        },
      ],
    },
  });

  if (count) {
    const result = await prismaClient.group_ticket.findMany({
      where: {
        OR: [
          {
            ticket_path: {
              contains: country || from || to || start_date || end_date,
            },
          },
        ],
      },
      skip: page <= 1 ? 0 : (page - 1) * limit,
      take: limit,
    });
    return { result, count };
  } else {
    throw new ResponseError(404, "No GroupTicket found!");
  }
};

// get GroupTicket by id
const getGroupTicketById = async (id: string) => {
  const GroupTicketId = validate(getGroupTicketValidation, id);
  const GroupTicket = await prismaClient.group_ticket.findUnique({
    where: { id: GroupTicketId },
  });

  if (GroupTicket) {
    return GroupTicket;
  } else {
    throw new ResponseError(404, "No GroupTicket found!");
  }
};

//update GroupTicket

const updateGroupTicket = async (
  id: string,
  reqData: DataRegister
  // ticketPathData: [],
) => {
  id = validate(getGroupTicketValidation, id);
  const updateDataGroupTicket = validate(updateGroupTicketValidation, reqData);
  // const updateDataGroupTicket = validate(updateGroupTicketValidation, reqData);
  const GroupTicketInDb = await prismaClient.group_ticket.findUnique({
    where: {
      id,
    },
  });
  if (!GroupTicketInDb) {
    throw new ResponseError(404, "GroupTicket not found!");
  } else {
    const result = await prismaClient.group_ticket.update({
      where: {
        id,
      },
      data: { ...updateDataGroupTicket },
    });

    return result;
  }
};

//delete GroupTicket

const deleteGroupTicket = async (id: string) => {
  id = validate(getGroupTicketValidation, id);

  const deleteGroupTicket = await prismaClient.group_ticket.delete({
    where: {
      id,
    },
  });

  return deleteGroupTicket;
};

export default {
  createGroupTicket,
  getGroupTicket,
  getGroupTicketById,
  updateGroupTicket,
  deleteGroupTicket,
};
