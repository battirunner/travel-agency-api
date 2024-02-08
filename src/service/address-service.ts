import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
} from "../validation/address-validation";
import { validate } from "../validation/validation";

interface DataRegister {
  house_no?: string;
  street_no?: string;
  area?: string;
  thana?: string;
  district?: string;
  postal_code?: string;
  country?: string;
  user_id?: string;
}

// create address service
const createAddress = async (reqData: DataRegister) => {
  const address = validate(createAddressValidation, reqData);

  const countAddress = await prismaClient.address.count({
    where: {
      user_id: address.user_id,
    },
  });

  if (countAddress === 1) {
    throw new ResponseError(400, "Address already exists");
  }

  const result = await prismaClient.address.create({
    data: address,
  });
  return result;
};

// get address
const getAddress = async () => {
  const result = await prismaClient.address.findMany();
  if (result) {
    return result;
  } else {
    throw new ResponseError(404, "No Address  found!");
  }
};

// get address by id
const getAddressById = async (id: string) => {
  const addressId = validate(getAddressValidation, id);
  const address = await prismaClient.address.findUnique({
    where: { id: addressId },
  });

  if (address) {
    return address;
  } else {
    throw new ResponseError(404, "No address found!");
  }
};

//update address
// type DataUpdate = {
//   title: string | null;
// };
const updateAddress = async (id: string, reqData: DataRegister) => {
  id = validate(getAddressValidation, id);
  const updateData = validate(updateAddressValidation, reqData);
  const addressInDb = await prismaClient.address.findUnique({
    where: {
      id,
    },
  });
  if (!addressInDb) {
    throw new ResponseError(404, "location not found!");
  } else {
    const data = {} as DataRegister;

    data.house_no = updateData.house_no || addressInDb.house_no;
    data.street_no = updateData.street_no || addressInDb.street_no
    data.area = updateData.area || addressInDb.area
    data.thana = updateData.thana || addressInDb.thana
    data.district = updateData.district || addressInDb.district
    data.postal_code = updateData.postal_code || addressInDb.postal_code
    data.country = updateData.country || addressInDb.country
    data.user_id = updateData.user_id ||   addressInDb.user_id


    const result = await prismaClient.address.update({
      where: {
        id,
      },
      data: data,
    });

    return result;
  }
};

//delete address

const deleteAddress = async (id: string) => {
  id = validate(getAddressValidation, id);

  const deleteAddress = await prismaClient.address.delete({
    where: {
      id,
    },
  });

  return deleteAddress;
};

export default {
  createAddress,
  getAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
};

// import { User } from "@prisma/client";
// import { prismaClient } from "../application/database";
// import { ResponseError } from "../error/response-error";
// import {
//   createAddressValidation,
//   getAddressValidation,
//   removeAddressValidation,
//   updateAddressValidation,
// } from "../validation/address-validation";
// import { getContactValidation } from "../validation/contact-validation";
// import { validate } from "../validation/validation";

// const checkContactMustExist = async (user: User, contactId: number) => {
//   contactId = validate(getContactValidation, contactId);

//   const totalContactInDatabase = await prismaClient.contact.count({
//     where: {
//       username: user.username,
//       id: contactId,
//     },
//   });

//   if (totalContactInDatabase !== 1) {
//     throw new ResponseError(404, "contact is not found");
//   }

//   return contactId;
// };

// const create = async (user: User, contactId: number, request: number) => {
//   contactId = await checkContactMustExist(user, contactId);

//   const address = validate(createAddressValidation, request);
//   address.contact_id = contactId;

//   const result = prismaClient.address.create({
//     data: address,
//     select: {
//       id: true,
//       street: true,
//       city: true,
//       province: true,
//       country: true,
//       postal_code: true,
//     },
//   });

//   return result;
// };

// const get = async (user: User, contactId: number, addressId: number) => {
//   contactId = await checkContactMustExist(user, contactId);
//   addressId = validate(getAddressValidation, addressId);

//   const address = await prismaClient.address.findFirst({
//     where: {
//       contact_id: contactId,
//       id: addressId,
//     },
//     select: {
//       id: true,
//       street: true,
//       city: true,
//       province: true,
//       country: true,
//       postal_code: true,
//     },
//   });

//   if (!address) {
//     throw new ResponseError(404, "address is not found");
//   }

//   return address;
// };

// const update = async (user: User, contactId: number, request: number) => {
//   contactId = await checkContactMustExist(user, contactId);
//   const address = validate(updateAddressValidation, request);

//   const totalAddressInDatabase = await prismaClient.address.count({
//     where: {
//       contact_id: contactId,
//       id: address.id,
//     },
//   });

//   if (totalAddressInDatabase !== 1) {
//     throw new ResponseError(404, "address is not found");
//   }

//   const result = prismaClient.address.update({
//     where: {
//       id: address.id,
//     },
//     data: {
//       street: address.street,
//       city: address.city,
//       province: address.province,
//       country: address.country,
//       postal_code: address.postal_code,
//     },
//     select: {
//       id: true,
//       street: true,
//       city: true,
//       province: true,
//       country: true,
//       postal_code: true,
//     },
//   });

//   return result;
// };

// const remove = async (user: User, contactId: number, addressId: number) => {
//   contactId = await checkContactMustExist(user, contactId);
//   addressId = validate(removeAddressValidation, addressId);

//   const totalAddressInDatabase = await prismaClient.address.count({
//     where: {
//       contact_id: contactId,
//       id: addressId,
//     },
//   });

//   if (totalAddressInDatabase !== 1) {
//     throw new ResponseError(404, "address is not found");
//   }

//   const result = prismaClient.address.delete({
//     where: {
//       id: addressId,
//     },
//   });

//   return result;
// };

// const list = async (user: User, contactId: number) => {
//   contactId = await checkContactMustExist(user, contactId);

//   const result = prismaClient.address.findMany({
//     where: {
//       contact_id: contactId,
//     },
//     select: {
//       id: true,
//       street: true,
//       city: true,
//       province: true,
//       country: true,
//       postal_code: true,
//     },
//   });

//   return result;
// };

// export default {
//   create,
//   get,
//   update,
//   remove,
//   list,
// };
