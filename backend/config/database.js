import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        dialectOptions: {
            ssl: {
              require: true, 
              rejectUnauthorized: false 
            }
          },

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        logging: false
    }
);

export default sequelize;