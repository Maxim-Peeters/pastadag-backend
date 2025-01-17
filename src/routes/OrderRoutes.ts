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
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);
router.patch('/orders/:id', patchStatus);
// Protected routes - require authentication
// router.get('/orders',protect, getAllOrders);
// router.get('/orders/:id', protect, getOrderById);
// router.put('/orders/:id', protect, updateOrder);
// router.delete('/orders/:id', protect, deleteOrder);

export default router;