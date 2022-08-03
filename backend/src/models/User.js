import sequelize from "sequelize";
const { STRING, BOOLEAN } = sequelize;
import db from "../../config/database.js";
import { RefreshToken } from "./RefreshTokens.js";

const User = db.define("user", {
    user_name: {
        type: STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: STRING,
        allowNull: false,
    },
    verified: {
        type: BOOLEAN,
        defaultValue: false,
    },
    regToken: {
        type: STRING,
        unique: false,
        allowNull: false,
    },
    regTokenExpiration: {
        type: STRING,
        allowNull: false,
    }
})

User.hasMany(RefreshToken);

export { User };