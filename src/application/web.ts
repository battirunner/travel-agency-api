//external import
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
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

const app = express();

//morgan for dev
app.use(morgan("dev"));

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors());

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

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

//not found and error middleware
app.use(notFound);
app.use(errorMiddleware);

export { app };
