import bcrypt from "bcrypt";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  createTourPackageValidation,
  getTourPackageValidation,
  updateTourPackageValidation,
} from "../validation/tourPackage-validation";
import { validate } from "../validation/validation";

interface DataRegister {
  title: string;
  description: string;
  duration: number;
  start_datetime: Date;
  end_datetime: Date;
  price: string;
  tour_type_id: string;
  terms_conditions: string;
  other_details: string;
  visa_Category_id: string;
  location_id: string;
}

// create tour service
const createTour = async (reqData: DataRegister) => {
  const tourPackage = validate(createTourPackageValidation, reqData);

  const countTourPackage = await prismaClient.tour_Package.count({
    where: {
      title: tourPackage.title,
    },
  });

  if (countTourPackage === 1) {
    throw new ResponseError(400, "Tour Package already exists");
  }

  const result = await prismaClient.tour_Package.create({
    data: tourPackage,
  });
  return result;
};

// get tours
const getTours = async () => {
  const result = await prismaClient.tour_Package.findMany();
  if (result) {
    return result;
  } else {
    throw new ResponseError(404, "No tours found!");
  }
};

// get tour by id
const getToursById = async (id: string) => {
  const tourPackageId = validate(getTourPackageValidation, id);
  const tourPackage = await prismaClient.tour_Package.findUnique({
    where: { id: tourPackageId },
  });

  if (tourPackage) {
    return tourPackage;
  } else {
    throw new ResponseError(404, "No tours found!");
  }
};

//update tour
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
const updateTour = async (id: string, reqData: DataRegister) => {
  id = validate(getTourPackageValidation, id);
  const updateData = validate(updateTourPackageValidation, reqData);
  const tourInDb = await prismaClient.tour_Package.findUnique({
    where: {
      id,
    },
  });
  if (!tourInDb) {
    throw new ResponseError(404, "User not found!");
  } else {
    const data = {} as DataRegister;

    data.title = updateData.title || tourInDb.title;
    data.description = updateData.description || tourInDb.description;
    data.duration = updateData.duration || tourInDb.duration;
    data.start_datetime = updateData.start_datetime || tourInDb.start_datetime;
    data.end_datetime = updateData.end_datetime || tourInDb.end_datetime;
    data.price = updateData.price || tourInDb.price;
    data.tour_type_id = updateData.tour_type_id || tourInDb.tour_type_id;
    data.terms_conditions =
      updateData.terms_conditions || tourInDb.terms_conditions;
    data.other_details = updateData.other_details || tourInDb.other_details;
    data.visa_Category_id =
      updateData.visa_Category_id || tourInDb.visa_Category_id;
    data.location_id = updateData.location_id || tourInDb.location_id;

    const result = await prismaClient.tour_Package.update({
      where: {
        id,
      },
      data: data,
    });

    return result;
  }
};

//delete tour package

const deleteTour =async (id:string) => {
    id = validate(getTourPackageValidation, id);

    const deleteTour = await prismaClient.tour_Package.delete({
        where: {
          id,
        },
      })

      return deleteTour;


}

export default {
  createTour,
  getTours,
  getToursById,
  updateTour,
  deleteTour,
};
