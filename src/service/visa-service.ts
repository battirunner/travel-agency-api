import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

import { validate } from "../validation/validation";
import {
  createVisaValidation,
  getVisaValidation,
  updateVisaValidation,
} from "../validation/visa-validation";

interface DataRegister {
  title: string;
  details: string;
  country: string;
  validity: string;
  price: string;
  min_stay: string;
  visa_category_id: string;
}

// create visa service
const createVisa = async (reqData: DataRegister) => {
  const visa = validate(createVisaValidation, reqData);

  const countVisa = await prismaClient.visa.count({
    where: {
      title: visa.title,
    },
  });

  if (countVisa === 1) {
    throw new ResponseError(400, "Visa already exists");
  }

  const result = await prismaClient.visa.create({
    data: visa,
  });
  return result;
};

// get visa
const getVisa = async (
  country: string,
  visaCategory: string,
  page: number,
  limit: number
) => {
  //get all visa if no params provided
  if (country === "" && visaCategory === "") {
    const count = await prismaClient.visa.count();
    console.log("visaCount: ", count);
    if (count) {
      const result = await prismaClient.visa.findMany({  
        include: { visa_category: true },
        skip: (page <= 1) ? 0 : (page - 1 * limit),
        take: limit,
      });
      //@ts-ignore
       
      return {result, count};
    } else {
      throw new ResponseError(404, "No visas found!");
    }
  }
  const result = await prismaClient.visa.findFirst({
    where: {
      country: {
        contains: `${country}`,
      },
      visa_category: {
        title: {
          contains: `${visaCategory}`,
        },
      },
    },
    include: {
      visa_category: true,
    },
  });
  if (result) {
    console.log(result);
    return result;
  } else {
    return {
      status: 200,
      success: false,
      message: "No visa found!",
    };
    // throw new Response(200, "No visa found!");
  }
};

// get visa by id
const getVisaById = async (id: string) => {
  const visaId = validate(getVisaValidation, id);
  const visa = await prismaClient.visa.findUnique({
    where: { id: visaId },
  });

  if (visa) {
    return visa;
  } else {
    throw new ResponseError(404, "No visa found!");
  }
};

//update visa

const updateVisa = async (id: string, reqData: DataRegister) => {
  id = validate(getVisaValidation, id);
  const updateData = validate(updateVisaValidation, reqData);
  const visaInDb = await prismaClient.visa.findUnique({
    where: {
      id,
    },
  });
  if (!visaInDb) {
    throw new ResponseError(404, "visa not found!");
  } else {
    const result = await prismaClient.visa.update({
      where: {
        id,
      },
      data: { ...updateData },
    });

    return result;
  }
};

//delete visa

const deleteVisa = async (id: string) => {
  id = validate(getVisaValidation, id);

  const deleteVisa = await prismaClient.visa.delete({
    where: {
      id,
    },
  });

  return deleteVisa;
};

export default {
  createVisa,
  getVisa,
  getVisaById,
  updateVisa,
  deleteVisa,
};
