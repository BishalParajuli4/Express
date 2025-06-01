import { Request, Response, NextFunction } from "express";
import { SqlOrderModel } from "../sql_models/order-sql-models";


export const getAllOrders = (req: Request, res: Response) => {
  res.json(SqlOrderModel.getAll());
};

export const getOrderById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const order = SqlOrderModel.getById(id);
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
    const order = await SqlOrderModel.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const updateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  const order = SqlOrderModel.getById(id);
  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }
    try {
    const updated = SqlOrderModel.update(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  const deleted = SqlOrderModel.delete(id);
  if (!deleted) {
    res.status(404).json({ message: "Order not found" });
    return;
  }
  res.status(204).send();
};