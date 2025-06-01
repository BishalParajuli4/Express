import { Request, Response, NextFunction } from "express";
import { SqlOrderModel } from "../sql_models/order-sql-models";

export const getAllOrders = async (req: Request, res: Response) => {
  res.json(await SqlOrderModel.getAll());
};

export const getOrderById = async(req: Request, res: Response) => {
  const id = Number(req.params.id);
  const order = await SqlOrderModel.getById(id);
  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }
  res.json(order);
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 try {
    const order = await SqlOrderModel.createOrder(req.body);
    console.log("order value",order);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  const order =await SqlOrderModel.getById(id);
  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }
  try {
    const updated =await SqlOrderModel.update(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder =async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  const deleted = await SqlOrderModel.delete(id);
  if (!deleted) {
    res.status(404).json({ message: "Order not found" });
    return;
  }
  res.status(204).send();
};