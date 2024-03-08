import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  createTourTypeValidation,
  getTourTypeValidation,
  updateTourTypeValidation,
} from "../validation/tourType-validation";
import { validate } from "../validation/validation";

interface DataRegister {
  title: string;
  details: string;
}

// create tour type service
const createTourType = async (reqData: DataRegister) => {
  const tourType = validate(createTourTypeValidation, reqData);

  const countTourType = await prismaClient.tour_Type.count({
    where: {
      title: tourType.title,
    },
  });

  if (countTourType === 1) {
    throw new ResponseError(400, "Tour Type already exists");
  }

  const result = await prismaClient.tour_Type.create({
    data: tourType,
  });
  return result;
};

// get tour types
const getTourType = async (tourType: string, page: number, limit: number) => {
  const result = await prismaClient.tour_Type.findMany({
    where: { OR: [{ title: { contains: tourType } }] },
    // include: { tourPackages: { include: { Location: true,visa_category:true } } },
  });
  if (result) {
    console.log(result);
    return result;
  } else {
    throw new ResponseError(404, "No tour type found!");
  }
};

// get tour type by id
const getTourTypeById = async (id: string) => {
  const tourTypeId = validate(getTourTypeValidation, id);
  const tourType = await prismaClient.tour_Type.findUnique({
    where: { id: tourTypeId },
  });

  if (tourType) {
    return tourType;
  } else {
    throw new ResponseError(404, "No tour type found!");
  }
};

//update tour type
// type DataUpdate = {
//   title: string | null;
//   description: string | null;
//   duration: number | null;
//   start_datetime: Date | null;
//   end_datetime: Date | null;
//   price: string | null;
//   tour_type_id: string | null;
//   terms_conditions: string | null;
//   other_details: string | null;
//   visa_Category_id: string | null;
//   location_id: string | null;
// };
const updateTourType = async (id: string, reqData: DataRegister) => {
  id = validate(getTourTypeValidation, id);
  const updateData = validate(updateTourTypeValidation, reqData);
  const tourTypeInDb = await prismaClient.tour_Type.findUnique({
    where: {
      id,
    },
  });
  if (!tourTypeInDb) {
    throw new ResponseError(404, "Tour type not found!");
  } else {
    const data = {} as DataRegister;

    data.title = updateData.title || tourTypeInDb.title;
    data.details = updateData.details;

    const result = await prismaClient.tour_Type.update({
      where: {
        id,
      },
      data: data,
    });

    return result;
  }
};

//delete tour type

const deleteTourType = async (id: string) => {
  id = validate(getTourTypeValidation, id);

  const deleteTourType = await prismaClient.tour_Type.delete({
    where: {
      id,
    },
  });

  return deleteTourType;
};

export default {
  createTourType,
  getTourType,
  getTourTypeById,
  updateTourType,
  deleteTourType,
};
