//external import
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

// internal import
import { errorMiddleware, notFound } from "../middleware/error-middleware";
import { bookingRouter } from "../routes/booking-api";
import { insuranceRouter } from "../routes/insurance-api";
import { insuranceCategoryRouter } from "../routes/insuranceCategory-api";
import { locationRouter } from "../routes/location-api";
import { mediaRouter } from "../routes/media-api";
import { publicRouter } from "../routes/public-api";
import { tagRouter } from "../routes/tag-api";
import { toursRouter } from "../routes/tourPackage-api";
import { tourTypeRouter } from "../routes/tourType-api";
import { userRouter } from "../routes/user-api";
import { visaCategoryRouter } from "../routes/visaCategory-api";
import { visaRouter } from "../routes/visa-api";
import { groupTicketRouter } from "../routes/groupTicket-api";
// import { groupTicketOnPathRouter } from "../routes/groupTicketOnPath-api";
import { ticketPathRouter } from "../routes/ticketPath-api";
import { countryRouter } from "../routes/country-api";

const app = express();

// cors
app.use(
  cors({ credentials: true, origin: `${process.env.FRONTEND_BASE_URL}` })
);

//morgan for dev
app.use(morgan("dev"));

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(function (req:Request, res:Response, next:NextFunction) {
  res.header("Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
});

// route
app.use(publicRouter);
app.use(userRouter);
app.use(bookingRouter);
app.use(insuranceRouter);
app.use(insuranceCategoryRouter);
app.use(toursRouter);
app.use(visaCategoryRouter);
app.use(tourTypeRouter);
app.use(tagRouter);
app.use(mediaRouter);
app.use(locationRouter);
app.use(visaRouter);
app.use(groupTicketRouter);
// app.use(groupTicketOnPathRouter);
app.use(ticketPathRouter);
app.use(countryRouter);

//not found and error middleware
app.use(notFound);
app.use(errorMiddleware);

export { app };
