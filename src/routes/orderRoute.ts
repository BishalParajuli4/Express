import { Router } from "express";
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from "../controllers/orderController";


const o_router = Router();

o_router.get("/", getAllOrders);
o_router.get("/:id", getOrderById);
o_router.post("/", createOrder);
o_router.put("/:id", updateOrder);
o_router.delete("/:id", deleteOrder);

export default o_router;