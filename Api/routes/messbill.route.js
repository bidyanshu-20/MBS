import express from 'express';
import { messbilling } from '../controllers/billing.controller.js';
const router = express.Router();

router.post("/admin/messbill/:rollno",messbilling);


export default router;

