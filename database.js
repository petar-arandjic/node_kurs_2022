import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize('delivery', 'root', 'root', {
    host: 'localhost',
    port: '3346',
    dialect: 'mysql'
});

const User = sequelize.define(
    "User",
    {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        verifiedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            default: null,
        }
    },
    {
        tableName: "users",
        underscored: true,
        timestamps: true,
    }
)

const Order = sequelize.define(
    "Order",
    {
        price: {
            type: DataTypes.DECIMAL(10, 2),
        },
        userId: {
          type: DataTypes.INTEGER,
        },
        cityId: {
          type: DataTypes.INTEGER
        }
    },
    {
        tableName: "orders",
        underscored: true,
        timestamps: true,
    }
)

const City = sequelize.define(
    "City",
    {
        name: {
            type: DataTypes.STRING,
        },
        post: {
            type: DataTypes.INTEGER,
        }
    },
    {
        tableName: "cities",
        underscored: true,
        timestamps: true,
    }
)

const Token = sequelize.define(
    'Token',
    {
        value: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
        }
    },
    {
        tableName: "tokens",
        underscored: true,
        timestamps: true,
    }
)

const Profile = sequelize.define(
"Profile",
{
    name: {
        type: DataTypes.STRING,
    },
    post: {
        type: DataTypes.INTEGER,
    }
},
{
    tableName: "profiles",
    underscored: true,
    timestamps: true,
})

const UserProfile = sequelize.define(
    "UserProfile",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: "Cascade",
            onDelete: "Cascade",
        },
        profileId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'profiles',
                key: 'id',
            },
            onUpdate: "Cascade",
            onDelete: "Cascade",
        }
    },
    {
        tableName: "users_profiles",
        underscored: true,
        timestamps: true,
    }
)

User.hasMany(Token)
Token.belongsTo(User)
User.hasMany(Order, { as: "orders" })
Order.belongsTo(User)
Order.belongsTo(City, { as: "city" })
City.hasMany(Order)
User.belongsToMany(Profile, { through: UserProfile })
Profile.belongsToMany(User, { through: UserProfile })

export const database = {
    sequelize,
    User,
    City,
    Token,
    UserProfile,
    Profile,
    Order,
}
