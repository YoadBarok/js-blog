import env from "dotenv/config";
import sequelize from '../config/database.js';
import {app} from "./server.js";

const port = process.env.PORT || 3001;

(async () => {
    await sequelize.sync({
        alter: true,
        force: false
    });
})();

app.listen(port, () => {
    console.log(
        `Express started on port: ${port}` + 
        "; press Ctrl-c to terminate."
    );
});