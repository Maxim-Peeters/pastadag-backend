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

const router = express.Router();

// Public route - no authentication required
router.post('/orders', createOrder);

// Protected routes - require authentication
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);
router.patch('/orders/:id/status', patchStatus);

export default router;