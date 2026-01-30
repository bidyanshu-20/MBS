import express from "express";
import { getUserMessBillByRollno } from "../controllers/messdata.controller.js";
// import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/user/messbill/:rollno",getUserMessBillByRollno);

export default router;


