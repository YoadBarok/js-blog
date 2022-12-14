import env from "dotenv/config";
import sequelize from '../config/database.js';
import {app} from "./server.js";

const port = process.env.PORT || 3000;

(async () => {
    await sequelize.sync({
        alter: false,
        force: false
    });
})();

app.listen(port, () => {
    console.log(
        `Express started on ${process.env.URL.match("localhost") ? "Port: " + process.env.PORT : process.env.URL}` + 
        "; press Ctrl-c to terminate."
    );
});