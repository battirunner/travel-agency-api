import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  createTourPackageValidation,
  getTourPackageValidation,
  updateTourPackageValidation,
} from "../validation/tourPackage-validation";
import { validate } from "../validation/validation";
import tourTypeService from "./tourType-service";

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
const getTours = async (tourType: string, page: number, limit: number) => {
  if (tourType !== "") {
    const count = await prismaClient.tour_Package.count({
      where: { tour_type: { title: tourType } },
    });

    if (count) {
      const result = await prismaClient.tour_Package.findMany({
        where: { tour_type: { title: tourType } },
        include: { Location: true, tour_type: true, visa_category: true },
        skip: page <= 1 ? 0 : (page - 1) * limit,
        take: limit,
      });
      return { result, count };
    } else {
      throw new ResponseError(404, "No tours found!");
    }
  } else {
    const count = await prismaClient.tour_Package.count({
      where: {
        NOT: [
          { tour_type: { title: { contains: "Hajj" } } },
          { tour_type: { title: { contains: "Umrah" } } },
        ],
      },
    });

    if (count) {
      const result = await prismaClient.tour_Package.findMany({
        where: {
          // NOT: { tour_type:{title:{contains:"Hajj"}} },
          NOT: [
            { tour_type: { title: { contains: "Hajj" } } },
            { tour_type: { title: { contains: "Umrah" } } },
          ],
        },
        include: { Location: true, tour_type: true, visa_category: true },
        skip: page <= 1 ? 0 : (page - 1) * limit,
        take: limit,
      });
      return { result, count };
    } else {
      throw new ResponseError(404, "No tours found!");
    }
  }
  // const result = await prismaClient.tour_Package.findMany({});
  // if (result) {
  //   return result;
  // } else {
  //   throw new ResponseError(404, "No tours found!");
  // }
};

// get tour by id
const getToursById = async (id: string) => {
  const tourPackageId = validate(getTourPackageValidation, id);
  const tourPackage = await prismaClient.tour_Package.findUnique({
    where: { id: tourPackageId },
    include: {
      Location: true,
      visa_category: true,
      media: true,
      tour_type: true,
    },
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
