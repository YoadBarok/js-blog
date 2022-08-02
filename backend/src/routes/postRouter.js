import express from "express";
import { postController } from "../controllers/postController.js";
import {authenticateToken} from '../middleware/authentication.js';

const postRouter = express.Router();
postRouter.use(express.json());
postRouter.get('/', postController.allPosts);
postRouter.post('/new-post', authenticateToken, postController.newPost);

export { postRouter };
