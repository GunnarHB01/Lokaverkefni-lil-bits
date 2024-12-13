import { Request, Response } from "express";
import { Order } from "../models/order";

let orders: Order[] = [];
let nextId = 1;

export const getOrders = (_req: Request, res: Response) => {
  res.status(200).json({ success: true, data: orders });
};

export const addOrder = (req: Request, res: Response) => {
  const { email, dish, drinks, count } = req.body;

  if (!email || !dish || !drinks || count === undefined) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const newOrder: Order = {
    id: nextId++,
    email,
    dish,
    drinks,
    count,
    date: new Date(),
  };

  orders.push(newOrder);
  res.status(201).json({ success: true, message: "Order created", order: newOrder });
};

export const modifyOrder = (req: Request, res: Response) => {
  const { id, email, dish, drinks, count } = req.body;

  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  orders[index] = { ...orders[index], email, dish, drinks, count };
  res.status(200).json({ success: true, message: "Order updated", order: orders[index] });
};

export const removeOrder = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  const deletedOrder = orders.splice(index, 1)[0];
  res.status(200).json({ success: true, message: "Order deleted", order: deletedOrder });
};
