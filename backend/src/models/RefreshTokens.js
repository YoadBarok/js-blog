import sequelize from "sequelize";
const { STRING } = sequelize;
import db from "../../config/database.js";

const RefreshToken = db.define("refresh_token", {
    token: {
        type: STRING,
        allowNull: false,
    }
})

export { RefreshToken };