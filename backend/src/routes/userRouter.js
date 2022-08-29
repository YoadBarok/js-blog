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
userRouter.get('/add-friend/:id', authenticateToken, userController.sendFriendRequest);
userRouter.get('/approve-friend-request/:id', authenticateToken, userController.approveFriendRequest);
userRouter.get('/reject-friend-request/:id', authenticateToken, userController.rejectFriendRequest);
userRouter.get('/cancel-friend-request/:id', authenticateToken, userController.cancelFriendRequest);

export { userRouter };
