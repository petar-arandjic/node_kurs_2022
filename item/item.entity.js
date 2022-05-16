import { DataTypes } from "sequelize";

export const newItemEntity = (sequelize) => {
    return sequelize.define(
        "Item",
        {
            name: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.STRING,
            },
            price: {
                type: DataTypes.DECIMAL,
            },
            quantity: {
                type: DataTypes.STRING,
            },
        },
        {
            tableName: "items",
            underscored: true,
            timestamps: true,
        }
    )
}