import express from 'express'
import { test, getAllUsersForAdmin } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test', test)
router.get("/admin/users", getAllUsersForAdmin);
export default router;