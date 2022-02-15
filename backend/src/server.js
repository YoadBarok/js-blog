import express from 'express';
import bodyParser from 'body-parser';

// routers
import {userRouter} from './routes/userRouter.js';

const { urlencoded, json } = bodyParser;

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/user", userRouter);

export { app };