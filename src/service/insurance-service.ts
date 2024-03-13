import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  createInsuranceValidation,
  getInsuranceValidation,
  updateInsuranceValidation,
} from "../validation/insurance-validation";

import { validate } from "../validation/validation";

interface DataRegister {
  category_id: string;
  title: string;
  details: string;
  country: Date;
  duration: Date;
  price: string;
}

// create insurance service
const createInsurance = async (reqData: DataRegister) => {
  const insurance = validate(createInsuranceValidation, reqData);

  const countInsurance = await prismaClient.insurance.count({
    where: {
      title: insurance.title,
    },
  });

  if (countInsurance === 1) {
    throw new ResponseError(400, "Insurance already exists");
  }

  const result = await prismaClient.insurance.create({
    data: insurance,
  });
  return result;
};

// get insurance
const getInsurance = async (page: number, limit: number) => {
  const count = await prismaClient.insurance.count({});

  if (count) {
    const result = await prismaClient.insurance.findMany({
      include: { insurance_category: true },
      skip: (page <= 1) ? 0 : (page - 1 * limit),
      take: limit,
    });
    return {result,count};
  } else {
    throw new ResponseError(404, "No insurance found!");
  }
};

// get insurance by id
const getInsuranceById = async (id: string) => {
  const insuranceId = validate(getInsuranceValidation, id);
  const insurance = await prismaClient.insurance.findUnique({
    where: { id: insuranceId },
  });

  if (insurance) {
    return insurance;
  } else {
    throw new ResponseError(404, "No insurance found!");
  }
};

//update insurance

const updateInsurance = async (id: string, reqData: DataRegister) => {
  id = validate(getInsuranceValidation, id);
  const updateData = validate(updateInsuranceValidation, reqData);
  const insuranceInDb = await prismaClient.insurance.findUnique({
    where: {
      id,
    },
  });
  if (!insuranceInDb) {
    throw new ResponseError(404, "Insurance not found!");
  } else {
    const result = await prismaClient.insurance.update({
      where: {
        id,
      },
      data: { ...updateData },
    });

    return result;
  }
};

//delete insurance

const deleteInsurance = async (id: string) => {
  id = validate(getInsuranceValidation, id);

  const deleteInsurance = await prismaClient.insurance.delete({
    where: {
      id,
    },
  });

  return deleteInsurance;
};

export default {
  createInsurance,
  getInsurance,
  getInsuranceById,
  updateInsurance,
  deleteInsurance,
};
