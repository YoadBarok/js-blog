import sequelize from "sequelize";
const { BOOLEAN, INTEGER } = sequelize;
import db from "../../config/database.js";



const Friendship = db.define("friendship", {
    approved: {
      type: BOOLEAN,
      defaultValue: false
    },
    requesterId: {
        type: INTEGER,
        allowNull: false,
    },
    targetUserId: {
        type: INTEGER,
        allownull: false
    }
  });

  export { Friendship };