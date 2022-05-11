import { database } from "../database.js";

export const findManyOrders = async (auth) => {
    return database.Order.findAndCountAll({
        where: { user_id: auth.id }
    })
}

export const createOrder = async (auth) => {
    return database.Order.create({
        price: 240.56,
        userId: auth.id,
        cityId: 1,
    })
}

export const updateOrder = async (auth) => {

}