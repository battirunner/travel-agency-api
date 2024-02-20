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
  included: string;
  not_included: string;
  tour_type_id: string;
  departure_location: string;
  map_url: string;
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
    const result = await prismaClient.tour_Package.update({
      where: {
        id,
      },
      data: { ...updateData },
    });

    return result;
  }
};

//delete tour package

const deleteTour = async (id: string) => {
  id = validate(getTourPackageValidation, id);

  const deleteTour = await prismaClient.tour_Package.delete({
    where: {
      id,
    },
  });

  return deleteTour;
};

export default {
  createTour,
  getTours,
  getToursById,
  updateTour,
  deleteTour,
};
