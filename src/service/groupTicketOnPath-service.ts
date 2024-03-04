// import { prismaClient } from "../application/database";
// import { ResponseError } from "../error/response-error";
// import { createGroupTicketOnPathValidation, getGroupTicketOnPathValidation, updateGroupTicketOnPathValidation } from "../validation/groupTicketOnPath-validation";



// import { validate } from "../validation/validation";

// interface DataRegister {
//     group_ticket_id: string;
//     ticket_path_id: string;
//     path_way?: string;
//   }

// // create GroupTicketOnPath service
// const createGroupTicketOnPath = async (reqData: DataRegister) => {
//     const GroupTicketOnPath = validate(createGroupTicketOnPathValidation, reqData);

// //   const countGroupTicketOnPath = await prismaClient.group_ticket_on_path.count({
// //     where: {
// //       title: GroupTicketOnPath.title,
// //     },
// //   });

// //   if (countGroupTicketOnPath === 1) {
// //     throw new ResponseError(400, "GroupTicketOnPath already exists");
// //   }

//   const result = await prismaClient.group_ticket_on_path.create({
//     data: GroupTicketOnPath,
//   });
//   return result;
// };

// // get GroupTicketOnPath
// const getGroupTicketOnPath = async () => {
//   const result = await prismaClient.group_ticket_on_path.findMany();
//   if (result) {
//     return result;
//   } else {
//     throw new ResponseError(404, "No GroupTicketOnPath found!");
//   }
// };

// // get GroupTicketOnPath by id
// const getGroupTicketOnPathById = async (id: string) => {
//   const GroupTicketOnPathId = validate(getGroupTicketOnPathValidation, id);
//   const GroupTicketOnPath = await prismaClient.group_ticket_on_path.findUnique({
//     where: { id: GroupTicketOnPathId },
//   });

//   if (GroupTicketOnPath) {
//     return GroupTicketOnPath;
//   } else {
//     throw new ResponseError(404, "No GroupTicketOnPath found!");
//   }
// };

// //update GroupTicketOnPath

// const updateGroupTicketOnPath = async (id: string, reqData: DataRegister) => {
//   id = validate(getGroupTicketOnPathValidation, id);
//   const updateData = validate(updateGroupTicketOnPathValidation, reqData);
//   const GroupTicketOnPathInDb = await prismaClient.group_ticket_on_path.findUnique({
//     where: {
//       id,
//     },
//   });
//   if (!GroupTicketOnPathInDb) {
//     throw new ResponseError(404, "GroupTicketOnPath not found!");
//   } else {
//     const result = await prismaClient.group_ticket_on_path.update({
//       where: {
//         id,
//       },
//       data: { ...updateData },
//     });

//     return result;
//   }
// };

// //delete GroupTicketOnPath

// const deleteGroupTicketOnPath = async (id: string) => {
//   id = validate(getGroupTicketOnPathValidation, id);

//   const deleteGroupTicketOnPath = await prismaClient.group_ticket_on_path.delete({
//     where: {
//       id,
//     },
//   });

//   return deleteGroupTicketOnPath;
// };

// export default {
//   createGroupTicketOnPath,
//   getGroupTicketOnPath,
//   getGroupTicketOnPathById,
//   updateGroupTicketOnPath,
//   deleteGroupTicketOnPath,
// };
