// routes/OrderRoutes.ts
import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  patchStatus
} from '../controllers/OrderController';
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

// Public route - no authentication required
router.post('/orders', createOrder);

// Protected routes - require authentication
router.get('/orders', protect, getAllOrders);
router.get('/orders/:id', protect, getOrderById);
router.put('/orders/:id', protect, updateOrder);
router.delete('/orders/:id', protect, deleteOrder);
router.patch('/orders/:id/status', protect, patchStatus);

export default router;