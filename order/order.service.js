import { database } from "../database.js";
import { findByIdUser } from "../user/user.service.js";
import {findByIdItem} from "../item/item.service.js";
import {BadRequest, NotFound} from "../errors.js";

export const findManyOrders = async (auth) => {
    return database.Order.findAndCountAll({
        where: { user_id: auth.id }
    })
}

export const createOrder = async (auth, payload) => {
    const user = await findByIdUser(auth.id)
    const item = await findByIdItem(payload.itemId)

    if (!item) {
        return NotFound("item")
    }
    if (item.quantity < payload.quantity) {
        return BadRequest(`only ${item.quantity} ${item.name} is available`)
    }

    const city = await database.City.findByPk(payload.cityId)
    if (!city) {
        return NotFound("city")
    }

    console.log(user)
    console.log("======")
    console.log(item)
    const newOrder = {
        price: item.price * payload.quantity,
        userId: user.id,
        cityId: payload.cityId,
        address: payload.address,
        postcode: payload.postcode,
        itemId: payload.itemId,
    }

    return database.Order.create(newOrder)
}

export const updateOrder = async (auth) => {

}