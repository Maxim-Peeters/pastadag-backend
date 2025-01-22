import { Request, Response, NextFunction } from 'express';
import Order from '../models/Order';
import {  sendOrderToMailingService } from '../services/mailingService';
export const getAllOrders = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order niet gevonden" });
    }
    return res.status(200).json(order);
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const order = await Order.create(req.body);
    await sendOrderToMailingService(order);
    return res.status(201).json(order);
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const order = await Order.findById(req.params.id).exec();
    if (!order) {
      return res.status(404).json({ message: "Order niet gevonden" });
    }
    order.set(req.body);
    await order.save();
    return res.status(200).json(order);
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order niet gevonden" });
    }
    await Order.deleteOne({ _id: order._id });
    return res.status(200).json({ message: "Order van " + order.naam + " verwijderd" });
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

//patch status
export const patchStatus = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const order = await Order.findById(req.params.id).exec();
    if (!order) {
      return res.status(404).json({ message: "Order niet gevonden" });
    }
    order.set(req.body);
    await order.save();
    return res.status(200).json(order);
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};