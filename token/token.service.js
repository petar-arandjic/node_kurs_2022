import { database } from "../database.js";
import { generateRandomAlphaNumeric } from "../common/random.js";

export const createToken = async (userId, type) => {
    // generate random value
    const value = generateRandomAlphaNumeric(6)

    // create token in db and return it
    return  await database.Token.create({
        userId,
        value,
        type,
    })
}

export const verifyToken = async (userId, tokenValue, type) => {
    // get token
    const token = await database.Token.findOne({
        where: {
            userId,
            value: tokenValue,
            type,
        }
    })
    if (!token) {
        return false
    }
    
    // delete token
    database.Token.destroy({
        where: { id: token.id }
    })

    // return bool
    return true
}

// find one token by user id and type
export const findOneByUserIdAndTypeToken = async (userId, type) => {
    return await database.Token.findOne({
        where: {
            userId,
            type,
        }
    })
}

// if exist delete token by user is and type
export const deleteByUserIdAndTypeToken = async (userId, type) => {
    return await database.Token.destroy({
        where: {
            userId,
            type,
        }
    })
}