import express from "express";
import countryController from "../controller/country-controller";
import { authMiddleware } from "../middleware/auth-middlleware";
import { isAdmin } from "../middleware/role-middleware";

const countryRouter = express.Router();

// Booking API
//Public

countryRouter.get(
  "/api/country",
  countryController.getCountry
);

countryRouter.get(
    "/api/country/:id",
    countryController.getCountryById
  );

// protected user



// protected admin
countryRouter.post(
  "/api/admin/country",
  authMiddleware,
  isAdmin,
  countryController.createCountry
);

countryRouter.put(
  "/api/admin/country/:id",
  authMiddleware,
  isAdmin,
  countryController.updateCountry
);
countryRouter.delete(
  "/api/admin/country/:id",
  authMiddleware,
  isAdmin,
  countryController.deleteCountry
);

export { countryRouter };
