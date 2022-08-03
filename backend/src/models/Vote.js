import sequelize from "sequelize";
const { STRING, BOOLEAN, INTEGER } = sequelize;
import db from "../../config/database.js";
import {Post} from "./Post.js"



const Vote = db.define("vote", {
    userId: {
      type: INTEGER,
      allowNull: false,
    },
    type: {
        type: STRING,
        allowNull: false,
    }
  });

  Vote.belongsTo(Post);

  export { Vote };