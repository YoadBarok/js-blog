import sequelize from "sequelize";
const { STRING, BOOLEAN, INTEGER } = sequelize;
import db from "../../config/database.js";
import {User} from "./User.js"



const Post = db.define("post", {
    title: {
      type: STRING,
      allowNull: false,
    },
    body: {
        type: STRING,
        allowNull: false,
    },
    upVotes: {
        type: INTEGER,
        defaultValue: 0
    },
    downVotes: {
        type: INTEGER,
        defaultValue: 0
    }
  });

  Post.belongsTo(User);

  export { Post };