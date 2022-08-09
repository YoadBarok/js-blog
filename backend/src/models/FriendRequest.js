import sequelize from "sequelize";
const { BOOLEAN, INTEGER } = sequelize;
import db from "../../config/database.js";



const FriendRequest = db.define("friend_request", {
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

  export { FriendRequest };