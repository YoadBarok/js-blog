import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// routers
import {userRouter} from './routes/userRouter.js';
import {postRouter} from './routes/postRouter.js';

const { urlencoded, json } = bodyParser;

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

// Register the routers:
app.use("/user", userRouter);
app.use("/post", postRouter);

export { app };