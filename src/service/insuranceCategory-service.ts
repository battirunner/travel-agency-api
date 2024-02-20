import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  createInsuranceCategoryValidation,
  getInsuranceCategoryValidation,
  updateInsuranceCategoryValidation,
} from "../validation/insuranceCategory-validation";
import { validate } from "../validation/validation";

interface DataRegister {
  title: string;
  details: string;
}

// create insurance category service
const createInsuranceCategory = async (reqData: DataRegister) => {
  const insuranceCategory = validate(
    createInsuranceCategoryValidation,
    reqData
  );

  const countInsuranceCategory = await prismaClient.insurance_category.count({
    where: {
      title: insuranceCategory.title,
    },
  });

  if (countInsuranceCategory === 1) {
    throw new ResponseError(400, "Insurance Category already exists");
  }

  const result = await prismaClient.insurance_category.create({
    data: insuranceCategory,
  });
  return result;
};

// get insurance category
const getInsuranceCategory = async () => {
  const result = await prismaClient.insurance_category.findMany();
  if (result) {
    return result;
  } else {
    throw new ResponseError(404, "No insurance category found!");
  }
};

// get insurance category by id
const getInsuranceCategoryById = async (id: string) => {
  const insuranceCategoryId = validate(getInsuranceCategoryValidation, id);
  const insuranceCategory = await prismaClient.insurance_category.findUnique({
    where: { id: insuranceCategoryId },
  });

  if (insuranceCategory) {
    return insuranceCategory;
  } else {
    throw new ResponseError(404, "No insurance category found!");
  }
};

//update insurance category
const updateInsuranceCategory = async (id: string, reqData: DataRegister) => {
  id = validate(getInsuranceCategoryValidation, id);
  const updateData = validate(updateInsuranceCategoryValidation, reqData);
  const insuranceCategoryInDb =
    await prismaClient.insurance_category.findUnique({
      where: {
        id,
      },
    });
  if (!insuranceCategoryInDb) {
    throw new ResponseError(404, "Insurance category not found!");
  } else {
    const result = await prismaClient.insurance_category.update({
      where: {
        id,
      },
      data: { ...updateData },
    });

    return result;
  }
};

//delete insurance category
const deleteInsuranceCategory = async (id: string) => {
  id = validate(getInsuranceCategoryValidation, id);

  const deleteInsuranceCategory = await prismaClient.insurance_category.delete({
    where: {
      id,
    },
  });

  return deleteInsuranceCategory;
};

export default {
  createInsuranceCategory,
  getInsuranceCategory,
  getInsuranceCategoryById,
  updateInsuranceCategory,
  deleteInsuranceCategory,
};
