import express from "express";
import countController from "../controller/count-controller";
import { authMiddleware } from "../middleware/auth-middlleware";
import { isAdmin } from "../middleware/role-middleware";

const countRouter = express.Router();

// Booking API
//Public


// protected user




// protected admin
countRouter.get("/api/admin/count",authMiddleware,isAdmin, countController.getCount);



export { countRouter };
