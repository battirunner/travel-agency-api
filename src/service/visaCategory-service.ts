import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  createVisaCategoryValidation,
  getVisaCategoryValidation,
  updateVisaCategoryValidation,
} from "../validation/visaCategory-validation";
import { validate } from "../validation/validation";

interface DataRegister {
  title: string;
  details: string;

}

// create tour service
const createVisaCategory = async (reqData: DataRegister) => {
  const visa = validate(createVisaCategoryValidation, reqData);

  const countVisa = await prismaClient.visa_Category.count({
    where: {
      title: visa.title,
    },
  });

  if (countVisa === 1) {
    throw new ResponseError(400, "Visa category already exists");
  }

  const result = await prismaClient.visa_Category.create({
    data: visa,
  });
  return result;
};

// get tours
const getVisaCategory = async () => {
  const result = await prismaClient.visa_Category.findMany();
  if (result) {
    return result;
  } else {
    throw new ResponseError(404, "No visas found!");
  }
};

// get tour by id
const getVisaCategoryById = async (id: string) => {
  const visaId = validate(getVisaCategoryValidation, id);
  const visa = await prismaClient.visa_Category.findUnique({
    where: { id: visaId },
  });

  if (visa) {
    return visa;
  } else {
    throw new ResponseError(404, "No visas found!");
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
const updateVisaCategory = async (id: string, reqData: DataRegister) => {
  id = validate(getVisaCategoryValidation, id);
  const updateData = validate(updateVisaCategoryValidation, reqData);
  const visaInDb = await prismaClient.visa_Category.findUnique({
    where: {
      id,
    },
  });
  if (!visaInDb) {
    throw new ResponseError(404, "visa not found!");
  } else {
    const data = {} as DataRegister;

    data.title = updateData.title || visaInDb.title;
    data.details = updateData.description || visaInDb.details;
    

    const result = await prismaClient.visa_Category.update({
      where: {
        id,
      },
      data: data,
    });

    return result;
  }
};

//delete tour package

const deleteVisaCategory =async (id:string) => {
    id = validate(getVisaCategoryValidation, id);

    const deleteVisa = await prismaClient.visa_Category.delete({
        where: {
          id,
        },
      })

      return deleteVisa;


}

// type DataUpdate = {
//   // id: string | null;
//   name: string | null;
//   password: string | null;
//   email: string | null;
//   phone: string | null;
// };

// const update = async (reqData: DataUpdate) => {
//   // console.log(reqData);
//   const user = validate(updateUserValidation, reqData);

//   const userInDatabase = await prismaClient.user.findUnique({
//     where: {
//       id: user.id,
//     },
//   });
//   if (!userInDatabase) {
//     throw new ResponseError(404, "User not found!");
//   }

//   const data = {} as {
//     name: string;
//     password: string;
//     email: string;
//     phone: string;
//   };

//   if (userInDatabase) {
//     data.name = user.name || userInDatabase.name;
//     data.phone = user.phone || userInDatabase.phone;
//     data.email = user.email || userInDatabase.email;
//   }

//   if (user.password) {
//     data.password = await bcrypt.hash(user.password, 10);
//   }

//   const result = await prismaClient.user.update({
//     where: {
//       id: user.id,
//     },
//     data: data,
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       phone: true,
//     },
//   });

//   return result;
// };

export default {
  createVisaCategory,
  getVisaCategory,
  getVisaCategoryById,
  updateVisaCategory,
  deleteVisaCategory,
};
