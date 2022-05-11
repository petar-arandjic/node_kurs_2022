import jwt from 'jsonwebtoken'
import { findByEmailUser } from "../user/user.service.js";
import { BadRequest } from "../errors.js";
import bcrypt from "bcrypt";
import { secret } from "./jwt.secret.js";

export const login = async (email, password) => {
    // check if email and password are passed
    if (!email || !password) {
        return BadRequest("email or password invalid")
    }

    // check if with user is exist
    const user = await findByEmailUser(email)
    if (!user) {
        return BadRequest("email or password invalid")
    }

    // check if password is valid
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        return BadRequest("email or password invalid")
    }

    // create jwt
    const token = jwt.sign({ id: user.id, email: user.email }, secret)

    // return jwt
    return { auth: token }
}

export const authenticateFromRequest = async (req) => {
    let user = null
    const bearerHeader = req.header("Authorization")
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        user = await getJwtData(bearerToken)
    }
    return user
}

export const getJwtData = async (token) => {
    return jwt.verify(token, secret, (err, authData) => {
        if (err) {
            return null
        }

        return {
            id: authData.id,
            email: authData.email
        }
    })
}