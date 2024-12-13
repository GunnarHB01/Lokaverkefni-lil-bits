import express from "express";
import { getOrders, addOrder, modifyOrder, removeOrder } from "../utils/validation";

const router = express.Router();

router.get("/", getOrders);
router.post("/", addOrder);
router.put("/", modifyOrder);
router.delete("/:id", removeOrder);

export default router;
