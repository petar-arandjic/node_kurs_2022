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
    const payload = req.body
    const order = await createOrder(auth, payload)
    res.json(order)
})

router.post

export default router