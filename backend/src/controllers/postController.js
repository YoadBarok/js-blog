import {postService} from '../services/postService.js';

class PostController {

    constructor(postService) {
        this.postService = postService;
    }

    allPosts = async (req, res) => {
        res.json({posts: await this.postService.serveAllPosts()});
    }

    newPost = async (req, res) => {
        try{
            const post = req.body.post;
            post.userId = req.user.id;
            return res.json({new_post: await this.postService.savePost(post)});
        } catch(e) {
            res.json({error: e.message})
            console.log(e.message);
        }
    }

}

const postController = new PostController(postService);

export { PostController, postController };