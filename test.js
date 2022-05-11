import express from "express";
import { database } from "./database.js";

const router = express.Router();

router.get('/user123', async (req, res) => {
    const user = await database.User.create({
        firstName: "petar",
        lastName: "arandjic",
        email: "jklsadjf@dfs.com123"
    })

    res.json(user)
})

export default router