import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { createCountryValidation, getCountryValidation, updateCountryValidation } from "../validation/country-validation";
import { validate } from "../validation/validation";

interface DataRegister {
  name: string;
  iso_code: string;
}

// create Country service
const createCountry = async (reqData: DataRegister) => {
  const Country = validate(createCountryValidation, reqData);

  const countCountry = await prismaClient.country.count({
    where: {
      name: Country.name,
    },
  });

  if (countCountry === 1) {
    throw new ResponseError(400, "Country already exists");
  }

  const result = await prismaClient.country.create({
    data: Country,
  });
  return result;
};

// get Country
const getCountry = async () => {
  const result = await prismaClient.country.findMany();
  if (result) {
    return result;
  } else {
    throw new ResponseError(404, "No Country  found!");
  }
};

// get Country by id
const getCountryById = async (id: string) => {
  const CountryId = validate(getCountryValidation, id);
  const Country = await prismaClient.country.findUnique({
    where: { id: CountryId },
  });

  if (Country) {
    return Country;
  } else {
    throw new ResponseError(404, "No Country found!");
  }
};

//update Country
// type DataUpdate = {
//   title: string | null;
// };
const updateCountry = async (id: string, reqData: DataRegister) => {
  id = validate(getCountryValidation, id);
  const updateData = validate(updateCountryValidation, reqData);
  const CountryInDb = await prismaClient.country.findUnique({
    where: {
      id,
    },
  });
  if (!CountryInDb) {
    throw new ResponseError(404, "Country not found!");
  } else {
    // const data = {} as DataRegister;

    // data.url = updateData.title || CountryInDb.url;
    // data.type = updateData.title || CountryInDb.type;
    // data.tour_Package_id = updateData.title || CountryInDb.tour_Package_id;

    const result = await prismaClient.country.update({
      where: {
        id,
      },
      data: updateData,
    });

    return result;
  }
};

//delete Country

const deleteCountry = async (id: string) => {
  id = validate(getCountryValidation, id);

  const deleteCountry = await prismaClient.country.delete({
    where: {
      id,
    },
  });

  return deleteCountry;
};

export default {
  createCountry,
  getCountry,
  getCountryById,
  updateCountry,
  deleteCountry,
};
