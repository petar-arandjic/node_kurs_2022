import express from "express";
import { createOrder, findManyOrders } from "./order.service.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const auth = req.auth
    const orders = await findManyOrders(auth)
    res.json(orders)
})

router.post('/', async (req, res) => {
    const auth = req.auth
    const order = await createOrder(auth)
    res.json(order)
})

export default router