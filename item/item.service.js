import { database } from "../database.js";
import { handleJoiValidationErrors, UnauthorizedRequest } from "../errors.js";
import { createItemValidator } from "./validation/create-item.validation.js";
import { findByIdUser } from "../user/user.service.js";

export const findByIdItem = async (id) => {
    return database.Item.findByPk(id)
}

export const findManyItem = async () => {
    return database.Item.findAndCountAll()
}

export const createItem = async (auth, payload) => {
    // validate data
    const validated = createItemValidator.validate(payload, { abortEarly: false })
    if (validated.error) {
        return handleJoiValidationErrors(validated.error)
    }

    const user = await findByIdUser(auth.id)
    if (!user) {
        return new UnauthorizedRequest()
    }

    return  await database.Item.create({
        ...payload,
        userId: auth.id
    })
}