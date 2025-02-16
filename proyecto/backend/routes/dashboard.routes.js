import { Router } from "express"
import { getDashboardData } from '../controllers/dashboard.controller.js';
import { authRequired } from "../middlewares/auth.middleware.js"

const router = Router();

router.get('/dashboard', authRequired, getDashboardData);

export default router;