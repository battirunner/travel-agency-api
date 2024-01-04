import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  createLocationValidation,
  getLocationValidation,
  updateLocationValidation,
} from "../validation/location-validation";
import { validate } from "../validation/validation";

interface DataRegister {
  name: string; 
  type: string; 
}

// create location service
const createLocation = async (reqData: DataRegister) => {
  const location = validate(createLocationValidation, reqData);

  const countLocation = await prismaClient.location.count({
    where: {
      name: location.title,
    },
  });

  if (countLocation === 1) {
    throw new ResponseError(400, "Location already exists");
  }

  const result = await prismaClient.location.create({
    data: location,
  });
  return result;
};

// get location
const getLocation = async () => {
  const result = await prismaClient.location.findMany();
  if (result) {
    return result;
  } else {
    throw new ResponseError(404, "No location  found!");
  }
};

// get location by id
const getLocationById = async (id: string) => {
  const locationId = validate(getLocationValidation, id);
  const location = await prismaClient.location.findUnique({
    where: { id: locationId },
  });

  if (location) {
    return location;
  } else {
    throw new ResponseError(404, "No location found!");
  }
};

//update tag
// type DataUpdate = {
//   title: string | null;
// };
const updateLocation = async (id: string, reqData: DataRegister) => {
  id = validate(getLocationValidation, id);
  const updateData = validate(updateLocationValidation, reqData);
  const locationInDb = await prismaClient.location.findUnique({
    where: {
      id,
    },
  });
  if (!locationInDb) {
    throw new ResponseError(404, "location not found!");
  } else {
    const data = {} as DataRegister;

    data.name = updateData.name || locationInDb.name;
    data.type = updateData.type || locationInDb.type;

    const result = await prismaClient.location.update({
      where: {
        id,
      },
      data: data,
    });

    return result;
  }
};

//delete location

const deleteLocation =async (id:string) => {
    id = validate(getLocationValidation, id);

    const deleteLocation = await prismaClient.location.delete({
        where: {
          id,
        },
      })

      return deleteLocation;


}



export default {
  createLocation,
  getLocation,
  getLocationById,
  updateLocation,
  deleteLocation,
};
