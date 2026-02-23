import express from 'express'
import { signup, signin, updateUserProfile, adminDeleteUser,handleForgotpassword,handleResetPassword,handleverifyOtp } from '../controllers/auth.controller.js';
import verifyUser from '../controllers/auth.middleware.js';
import { isAdmin } from '../controllers/verifyAdmin.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.put("/update", verifyUser, updateUserProfile);
router.delete("/admin/delete/user/:id", verifyUser, isAdmin, adminDeleteUser);
router.post("/forgot-password",handleForgotpassword);
router.post("/verify-otp",handleverifyOtp);
router.post("/reset-password",handleResetPassword);
export default router;