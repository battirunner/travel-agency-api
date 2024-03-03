import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  createGroupTicketValidation,
  getGroupTicketValidation,
  updateGroupTicketValidation,
} from "../validation/groupTicket-validation";
import ticketPathService from "./ticketPath-service";
// import groupTicketOnPathService from "./groupTicketOnPath-service";
import { validate } from "../validation/validation";

interface DataRegister {
  start_place: string;
  end_place: string;
  price: string;
  show_price: boolean;
  food: boolean;
  baggage: string;
  policy: string;
}

// create GroupTicket service
const createGroupTicket = async (
  groupTicketData: DataRegister,
  ticketPathData: []
) => {
  const GroupTicket = validate(createGroupTicketValidation, groupTicketData);

  //   const countGroupTicket = await prismaClient.group_ticket.count({
  //     where: {
  //       title: GroupTicket.title,
  //     },
  //   });

  //   if (countGroupTicket === 1) {
  //     throw new ResponseError(400, "GroupTicket already exists");
  //   }

  const GroupTicketResult = await prismaClient.group_ticket.create({
    data: GroupTicket,
  });

  let TicketPathResult;
  let GroupTicketOnPathResult;

  for (let index = 0; index < ticketPathData.length; index++) {
    TicketPathResult = await ticketPathService.createTicketPath(
      ticketPathData[index],
      GroupTicketResult.id,
      index + 1
    );
    // const GroupTicketOnPath = {
    //   group_ticket_id: GroupTicketResult.id,
    //   //@ts-ignore
    //   ticket_path_id: TicketPathResult.id,
    // };
    // GroupTicketOnPathResult =
    //   await groupTicketOnPathService.createGroupTicketOnPath(GroupTicketOnPath);
  }

  return {
    GroupTicketResult,
    // GroupTicketOnPathResult,
    // TicketPathResult,
  };
};

// get GroupTicket
const getGroupTicket = async (country: string, page: number, limit: number) => {
  if (country !== "") {
    const result = await prismaClient.group_ticket.findMany({
      where: {
        country: {
          contains: country,
        },
      },
      include: {
        ticket_path: true,
      },
      skip: page <= 1 ? 0 : page * limit,
      take: limit,
    });
    if (result) {
      return result;
    } else {
      throw new ResponseError(404, "No GroupTicket found!");
    }
  } else {
    const result = await prismaClient.group_ticket.findMany({
      include: {
        ticket_path: true,
      },
      skip: page <= 1 ? 0 : page * limit,
      take: limit,
    });
    if (result) {
      return result;
    } else {
      throw new ResponseError(404, "No GroupTicket found!");
    }
  }
};

// get GroupTicket by id
const getGroupTicketById = async (id: string) => {
  const GroupTicketId = validate(getGroupTicketValidation, id);
  const GroupTicket = await prismaClient.group_ticket.findUnique({
    where: { id: GroupTicketId },
    include: { ticket_path: true },
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
