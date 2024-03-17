import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { createAirportsValidation, getAirportsValidation, updateAirportsValidation} from "../validation/airports-validation";
import { validate } from "../validation/validation";

interface DataRegister {
  name: string;
  iata_code: string;
  city: string;
  country: string;
}

// create airports service
const createAirports = async (reqData: DataRegister) => {
  const airports = validate(createAirportsValidation, reqData);

  const countAirports = await prismaClient.airports.count({
    where: {
      name: airports.name,
    },
  });

  if (countAirports === 1) {
    throw new ResponseError(400, "airports already exists");
  }

  const result = await prismaClient.airports.create({
    data: airports,
  });
  return result;
};

// get airports
const getAirports = async (search: string, page: number, limit: number) => {
  const count = await prismaClient.airports.count({
    where: {
      OR: [
        { name: { contains: search } },
        { iata_code: { contains: search } },
        { city: { contains: search } },
        { country: { contains: search } },
      ],
    },
  });
  if (count) {
    const result = await prismaClient.airports.findMany({
      where: {
        OR: [
          { name: { contains: search } },
          { iata_code: { contains: search } },
          { city: { contains: search } },
          { country: { contains: search } },
        ],
      },
      orderBy:{
        name: "asc",
      },
      skip: page <= 1 ? 0 : (page - 1) * limit,
      take: limit,
    });

    return { result, count };
  } else {
    throw new ResponseError(404, "No airports  found!");
  }
};

// get airports by id
const getAirportsById = async (id: string) => {
  const airportsId = validate(getAirportsValidation, id);
  const airports = await prismaClient.airports.findUnique({
    where: { id: airportsId },
  });

  if (airports) {
    return airports;
  } else {
    throw new ResponseError(404, "No airports found!");
  }
};

//update airports
// type DataUpdate = {
//   title: string | null;
// };
const updateAirports = async (id: string, reqData: DataRegister) => {
  id = validate(getAirportsValidation, id);
  const updateData = validate(updateAirportsValidation, reqData);
  const airportsInDb = await prismaClient.airports.findUnique({
    where: {
      id,
    },
  });
  if (!airportsInDb) {
    throw new ResponseError(404, "airports not found!");
  } else {
    

    const result = await prismaClient.airports.update({
      where: {
        id,
      },
      data: updateData,
    });

    return result;
  }
};

//delete airports

const deleteAirports = async (id: string) => {
  id = validate(getAirportsValidation, id);

  const deleteAirports = await prismaClient.airports.delete({
    where: {
      id,
    },
  });

  return deleteAirports;
};

export default {
  createAirports,
  getAirports,
  getAirportsById,
  updateAirports,
  deleteAirports,
};
