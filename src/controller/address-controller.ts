// import { NextFunction, Request, Response } from "express";
// import asyncHandler from "express-async-handler";
// import addressService from "../service/address-service";

// // @desc Fetch all address
// // route GET /api/user/address
// // @access Public
// const getAddress = asyncHandler(async (req: Request, res: Response) => {
//   const result = await addressService.getAddress();
//   res.status(200).json({
//     data: result,
//   });
// });

// // @desc Fetch a single address
// // route GET /api/user/address/:id
// // @access Public
// const getAddressById = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const result = await addressService.getAddressById(req.params.id);
//     res.status(201).json({ data: result });
//   }
// );

// // @desc Create a address
// // route POST /api/user/address
// // @access Private/Admin
// const createAddress = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const result = await addressService.createAddress(req.body);
//     res.status(201).json({ data: result });
//   }
// );

// // @desc    Update a address
// // @route   PUT /api/user/address/:id
// // @access  Private/admin
// const updateAddress = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     // @ts-ignore
//     // console.log(req.user.userId);
//     // @ts-ignore
//     const result = await addressService.updateAddress(
//       req.params.id,
//       req.body
//     );
//     res.status(200).json({ data: result });
//   }
// );

// // @desc    Delete a address
// // @route   DELETE /api/user/address/:id
// // @access  Private/Admin
// const deleteAddress = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const result = await addressService.deleteAddress(req.params.id);
//     res.status(200).json({ data: result });
//   }
// );

// export default {
//   getAddress,
//   getAddressById,
//   createAddress,
//   updateAddress,
//   deleteAddress,
// };






// import { NextFunction, Request, Response } from "express";
// import addressService from "../service/address-service";

// const create = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // @ts-ignore
//     const user = req.user;
//     const request = req.body;
//     const contactId = req.params.contactId as unknown as number;

//     const result = await addressService.create(user, contactId, request);
//     res.status(200).json({ data: result });
//   } catch (error) {
//     next(error);
//   }
// };

// const get = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // @ts-ignore
//     const user = req.user;
//     const contactId = req.params.contactId as unknown as number;
//     const addressId = req.params.addressId as unknown as number;

//     const result = await addressService.get(user, contactId, addressId);
//     res.status(200).json({ data: result });
//   } catch (error) {
//     next(error);
//   }
// };

// const update = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // @ts-ignore
//     const user = req.user;
//     const contactId = req.params.contactId as unknown as number;
//     const addressId = req.params.addressId as unknown as number;
//     const request = req.body;

//     request.id = addressId;

//     const result = await addressService.update(user, contactId, request);
//     res.status(200).json({ data: result });
//   } catch (error) {
//     next(error);
//   }
// };

// const remove = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // @ts-ignore
//     const user = req.user;
//     const contactId = req.params.contactId as unknown as number;
//     const addressId = req.params.addressId as unknown as number;

//     const result = await addressService.remove(user, contactId, addressId);
//     res.status(200).json({ data: "OK" });
//   } catch (error) {
//     next(error);
//   }
// };

// const list = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // @ts-ignore
//     const user = req.user;
//     const contactId = req.params.contactId as unknown as number;

//     const result = await addressService.list(user, contactId);
//     res.status(200).json({ data: result });
//   } catch (error) {
//     next(error);
//   }
// };

// export default {
//   create,
//   get,
//   update,
//   remove,
//   list,
// };
