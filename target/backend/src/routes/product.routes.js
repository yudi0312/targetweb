import { Router } from 'express';
import {
  getCategories,
  getProductById,
  getProducts,
  getProductStats
} from '../controllers/product.controller.js';

const router = Router();

router.get('/products', getProducts);
router.get('/products/categories', getCategories);
router.get('/products/stats', getProductStats);
router.get('/products/:id', getProductById);

export default router;
