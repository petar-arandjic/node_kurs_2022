import { database } from "../database.js";
import { findByIdUser } from "../user/user.service.js";
import {findByIdItem, updateReservedItem} from "../item/item.service.js";
import { BadRequest, handleJoiValidationErrors, NotFound } from "../errors.js";
import { updateOrderStatusValidator } from "./validation/update-order-status.validation.js";

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

    if (auth.id == item.userId) {
        return BadRequest("you can't order you own item")
    }

    const newOrder = {
        price: item.price * payload.quantity,
        userId: user.id,
        cityId: payload.cityId,
        address: payload.address,
        postcode: payload.postcode,
        itemId: payload.itemId,
        ownerId: item.userId,
        status: "CREATED"
    }

    const order = await database.Order.create(newOrder)
    if (order) {
        updateReservedItem(item.id, payload.quantity)
    }

    return order
}

export const updateOrderStatus = async (orderId, payload) => {
    // validate data
    const validated = updateOrderStatusValidator.validate(payload, { abortEarly: false })
    if (validated.error) {
        return handleJoiValidationErrors(validated.error)
    }

    const order = await database.Order.findByPk(orderId)
    if (!orderId) {
        return NotFound('order')
    }
    order.status = payload.status
    await order.save()
    return order
}