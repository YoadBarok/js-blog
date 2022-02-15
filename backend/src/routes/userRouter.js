import {Router, json} from 'express'
import {userController} from "../controllers/userController.js";
import {authenticateToken} from '../middleware/authentication.js';

const userRouter = Router();
userRouter.use(json());

userRouter.get('/identify', authenticateToken, userController.identify);
userRouter.post('/save-user', userController.save);
userRouter.get('/verify/:regToken', userController.verify);
userRouter.post('/login', userController.login);
userRouter.post('/token', userController.refreshToken)

export { userRouter };
