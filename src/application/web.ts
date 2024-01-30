//external import
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// internal import
import { publicRouter } from "../routes/public-api";
import { userRouter } from "../routes/user-api";
import { toursRouter } from "../routes/tourPackage-api";
import { tagRouter } from "../routes/tag-api";
import { mediaRouter } from "../routes/media-api";
import { tourTypeRouter } from "../routes/tourType-api";
import { locationRouter } from "../routes/location-api";
import { visaCategoryRouter } from "../routes/visaCategory-api";
import { errorMiddleware, notFound } from "../middleware/error-middleware";

export const app = express();

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
app.use(toursRouter);
app.use(visaCategoryRouter);
app.use(tourTypeRouter);
app.use(tagRouter);
app.use(mediaRouter);
app.use(locationRouter);

app.use(notFound);
app.use(errorMiddleware);
