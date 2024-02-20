//external import

//inernal import
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  createBookingValidation,
  deleteBookingValidation,
  getBookingByUserValidation,
  getBookingValidation,
  updateBookingValidation,
} from "../validation/booking-validation";
import { validate } from "../validation/validation";

interface DataRegister {
  user_id: string;
  booking_user_contact: string;
  booking_user_address: string;
  booking_user_notes: string;
  booking_item_type: string;
  booking_item_id: string;
  booking_informations: string;
  payment_status: string;
  approval_status: string;
}

// create booking service
const createBooking = async (reqData: DataRegister) => {
  const booking = validate(createBookingValidation, reqData);
  const result = await prismaClient.booking.create({
    data: booking,
  });
  return result;
};

// get all booking
const getBooking = async () => {
  const result = await prismaClient.booking.findMany();
  if (result) {
    return result;
  } else {
    throw new ResponseError(404, "No booking found!");
  }
};

// get booking by  id
const getBookingById = async (id: string) => {
  const bookingId = validate(getBookingValidation, {id});
  const booking = await prismaClient.booking.findUnique({
    where: { id: bookingId },
  });

  if (booking) {
    return booking;
  } else {
    throw new ResponseError(404, "No booking found!");
  }
};

// get booking by user id
const getBookingByUserId = async (user_id: string) => {
  const bookingUserId = validate(getBookingByUserValidation, {user_id});
  const booking = await prismaClient.booking.findMany({
    where: { user_id: bookingUserId },
  });

  if (booking) {
    return booking;
  } else {
    throw new ResponseError(404, "No booking found!");
  }
};

//update booking
const updateBooking = async (id: string, reqData: DataRegister) => {
  id = validate(getBookingValidation, {id});
  const updateData = validate(updateBookingValidation, reqData);
  const bookingInDb = await prismaClient.booking.findUnique({
    where: {
      id,
    },
  });
  if (!bookingInDb) {
    throw new ResponseError(404, "Booking not found!");
  } else {
    // const data = {} as DataRegister;

    const result = await prismaClient.booking.update({
      where: {
        id,
      },
      data: { ...updateData },
    });

    return result;
  }
};

//delete booking

const deleteBooking = async (id: string) => {
  id = validate(deleteBookingValidation, {id});

  const deleteBooking = await prismaClient.booking.delete({
    where: {
      id,
    },
  });

  return deleteBooking;
};

export default {
  createBooking,
  getBooking,
  getBookingById, 
  getBookingByUserId, 
  updateBooking,
  deleteBooking,
};
