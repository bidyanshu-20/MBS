import express from "express";
import { getUserMessBill } from "../controllers/messdata.controller.js";
import  verifyUser  from "../controllers/auth.middleware.js";

const router = express.Router();
router.get("/user/messbill",verifyUser,getUserMessBill);

export default router;






