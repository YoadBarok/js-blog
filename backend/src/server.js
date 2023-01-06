import express from 'express';
import cors from 'cors';
import { limiter } from './middleware/rateLimit.js'
import { cleanExpiredRefreshTokens } from './middleware/cleanRefreshTokens.js'


// routers
import { userRouter } from './routes/userRouter.js';
import { postRouter } from './routes/postRouter.js';

const app = express();

app.use(cors({ credentials: true }))
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(limiter);

// Scheduled jobs:
setInterval(cleanExpiredRefreshTokens, 120000) // Every 2 minutes

// Register the routers:
app.use("/user", userRouter);
app.use("/post", postRouter);

app.get("/", function(req, res) {res.send("Yoad's demo blog API")})

export { app };