import express from "express";
import { postController } from "../controllers/postController.js";
import {authenticateToken} from '../middleware/authentication.js';

const postRouter = express.Router();
postRouter.use(express.json());
postRouter.get('/', postController.allPosts);
postRouter.post('/new-post', authenticateToken, postController.newPost);
postRouter.post('/edit', authenticateToken, postController.edit);
postRouter.post('/delete', authenticateToken, postController.delete);

export { postRouter };
