import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// routers
import {userRouter} from './routes/userRouter.js';

const { urlencoded, json } = bodyParser;

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/user", userRouter);

export { app };