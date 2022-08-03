import express from "express";
import { postController } from "../controllers/postController.js";
import {authenticateToken} from '../middleware/authentication.js';

const postRouter = express.Router();
postRouter.use(express.json());
postRouter.get('/', postController.allPosts);
postRouter.post('/new-post', authenticateToken, postController.newPost);
postRouter.post('/edit', authenticateToken, postController.edit);
postRouter.get('/delete/:postId', authenticateToken, postController.delete);
postRouter.get('/upvote/:postId', authenticateToken, postController.upvote);
postRouter.get('/downvote/:postId', authenticateToken, postController.downvote);

export { postRouter };
