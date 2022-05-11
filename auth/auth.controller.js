import express from "express";
import { login } from "./auth.service.js";
import { createUser } from "../user/user.service.js";

const router = express.Router();

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const response = await login(email, password)
    res.json(response)
})

// User registration
router.post('/registration', async (req, res) => {
    const payload = req.body
    try {
        const response = await createUser(payload)
        res.json(response)
    } catch (e) {

    }
})

export default router