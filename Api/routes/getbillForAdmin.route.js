import express from 'express'
import { getAdminUserMessBill } from '../controllers/UserBillForAdmin.controller.js';
import verifyUser from '../controllers/auth.middleware.js';
import { isAdmin } from '../controllers/verifyAdmin.js';
const router = express.Router();
router.get(
    "/messbill/:rollno",
    verifyUser, isAdmin,
    getAdminUserMessBill
);
export default router;
