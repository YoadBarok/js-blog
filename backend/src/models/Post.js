import sequelize from "sequelize";
const { STRING, BOOLEAN, INTEGER } = sequelize;
import db from "../../config/database.js";
import {User} from "./User.js"



const Post = db.define("post", {
    title: {
      type: STRING,
      allowNull: false,
      unique: true
    },
    body: {
        type: STRING,
        allowNull: false,
    },
    points: {
        type: INTEGER,
        defaultValue: 0
    }
  });

  Post.belongsTo(User);

  export { Post };