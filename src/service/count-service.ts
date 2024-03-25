import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

// get all count from database
const getCount = async () => {
  const airportsCount = await prismaClient.airports.count();
  const airlinesCount = await prismaClient.airlines.count();
  const visaBookingCount = await prismaClient.booking.count({
    where: { booking_item_type: { equals: "VISA" } },
  });
  const hajjBookingCount = await prismaClient.booking.count({
    where: { booking_item_type: { equals: "HAJJ" } },
  });
  const umrahBookingCount = await prismaClient.booking.count({
    where: { booking_item_type: { equals: "UMRAH" } },
  });
  const toursBookingCount = await prismaClient.booking.count({
    where: { booking_item_type: { equals: "TOURS" } },
  });
  const insuranceBookingCount = await prismaClient.booking.count({
    where: { booking_item_type: { equals: "INSURANCE" } },
  });
  const flightTicketBookingCount = await prismaClient.booking.count({
    where: { booking_item_type: { equals: "FLIGHT_TICKET" } },
  });
  const groupTicketBookingCount = await prismaClient.booking.count({
    where: { booking_item_type: { equals: "GROUP_TICKET" } },
  });
  const hotelBookingCount = await prismaClient.booking.count({
    where: { booking_item_type: { equals: "HOTEL" } },
  });
  const todayTotalBookingCount = await prismaClient.booking.count({
    where: {
      booking_datetime: {
        contains: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`,
      },
    },
  });

  const contactFormCount = await prismaClient.contact_form.count();
  const countryCount = await prismaClient.country.count();
  const groupTicketCount = await prismaClient.group_ticket.count();
  const insuranceCount = await prismaClient.insurance.count();
  const insuranceCategoryCount = await prismaClient.insurance_category.count();
  const locationCount = await prismaClient.location.count();
  const notificationsCount = await prismaClient.notifications.count();
  const paymentCount = await prismaClient.payment.count();
  const tourCount = await prismaClient.tour_Package.count({
    where: { tour_type: { NOT: { title: { contains: "Hajj" || "Umrah" } } } },
  });
  const hajjCount = await prismaClient.tour_Package.count({
    where: { tour_type: { title: { contains: "Hajj" } } },
  });
  const umrahCount = await prismaClient.tour_Package.count({
    where: { tour_type: { title: { contains: "Umrah" } } },
  });
  const tourTypeCount = await prismaClient.tour_Type.count();
  const adminCount = await prismaClient.user.count({
    where: { role: { equals: "ADMIN" } },
  });
  const moderatorCount = await prismaClient.user.count({
    where: { role: { equals: "MODERATOR" } },
  });
  const normalUserCount = await prismaClient.user.count({
    where: { role: { equals: "USER" } },
  });
  const visaCount = await prismaClient.visa.count();
  const visaCategoryCount = await prismaClient.visa_Category.count();
  return {
    airportsCount,
    airlinesCount,
    visaBookingCount,
    contactFormCount,
    visaCategoryCount,
    visaCount,
    umrahBookingCount,
    toursBookingCount,
    umrahCount,
    countryCount,
    flightTicketBookingCount,
    groupTicketBookingCount,
    groupTicketCount,
    hajjBookingCount,
    hajjCount,
    tourCount,
    locationCount,
    notificationsCount,
    hotelBookingCount,
    insuranceBookingCount,
    insuranceCategoryCount,
    insuranceCount,
    paymentCount,
    tourTypeCount,
    adminCount,
    moderatorCount,
    normalUserCount,
    todayTotalBookingCount,
  };
};

export default {
  getCount,
};
