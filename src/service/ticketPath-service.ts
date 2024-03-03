import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  createTicketPathValidation,
  getTicketPathValidation,
  updateTicketPathValidation,
} from "../validation/ticketPath-validation";

import { validate } from "../validation/validation";

interface DataRegister {
  departure_place: string;
  departure_airport: string;
  departure_airlines: string;
  departure_aircraft: string;
  departure_datetime: Date;
  arrival_place: string;
  arrival_airport: string;
  arrival_airlines: string;
  arrival_aircraft: string;
  arrival_datetime: Date;
}

// create TicketPath service
const createTicketPath = async (
  reqData: DataRegister,
  gorupTicketId: string,
  pathOrder: number
) => {
  const TicketPath = validate(createTicketPathValidation, reqData);
  const groupTicketId = validate(getTicketPathValidation, { gorupTicketId });
  TicketPath.group_ticket_id = groupTicketId;
  TicketPath.path_order = pathOrder;

  //   const countTicketPath = await prismaClient.ticket_path.count({
  //     where: {
  //       title: TicketPath.title,
  //     },
  //   });

  //   if (countTicketPath === 1) {
  //     throw new ResponseError(400, "TicketPath already exists");
  //   }

  const result = await prismaClient.ticket_path.create({
    data: TicketPath,
  });
  return result;
};

// get TicketPath
const getTicketPath = async () => {
  const result = await prismaClient.ticket_path.findMany();
  if (result) {
    return result;
  } else {
    throw new ResponseError(404, "No TicketPath found!");
  }
};

// get TicketPath by id
const getTicketPathById = async (id: string) => {
  const TicketPathId = validate(getTicketPathValidation, id);
  const TicketPath = await prismaClient.ticket_path.findUnique({
    where: { id: TicketPathId },
  });

  if (TicketPath) {
    return TicketPath;
  } else {
    throw new ResponseError(404, "No TicketPath found!");
  }
};

//update TicketPath

const updateTicketPath = async (id: string, reqData: DataRegister) => {
  id = validate(getTicketPathValidation, id);
  const updateData = validate(updateTicketPathValidation, reqData);
  const TicketPathInDb = await prismaClient.ticket_path.findUnique({
    where: {
      id,
    },
  });
  if (!TicketPathInDb) {
    throw new ResponseError(404, "TicketPath not found!");
  } else {
    const result = await prismaClient.ticket_path.update({
      where: {
        id,
      },
      data: { ...updateData },
    });

    return result;
  }
};

//delete TicketPath

const deleteTicketPath = async (id: string) => {
  id = validate(getTicketPathValidation, id);

  const deleteTicketPath = await prismaClient.ticket_path.delete({
    where: {
      id,
    },
  });

  return deleteTicketPath;
};

export default {
  createTicketPath,
  getTicketPath,
  getTicketPathById,
  updateTicketPath,
  deleteTicketPath,
};
