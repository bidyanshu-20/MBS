import express from 'express'
import { test, getAllUsersForAdmin } from '../controllers/user.controller.js';
import verifyUser from '../controllers/auth.middleware.js';
import { isAdmin } from '../controllers/verifyAdmin.js';
const router = express.Router();

router.get('/test', test)
router.get("/admin/users",verifyUser,isAdmin, getAllUsersForAdmin);
export default router;


