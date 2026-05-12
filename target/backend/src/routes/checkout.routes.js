import { Router } from 'express';
import { checkout } from '../controllers/checkout.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/checkout', requireAuth, checkout);

export default router;
