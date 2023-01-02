import { postService } from '../services/postService.js';

class PostController {

    constructor(postService) {
        this.postService = postService;
    }

    allUserPosts = async (req, res) => {
        res.json({ posts: await this.postService.serveAllByUserId(req.user.id) });
    }

    newPost = async (req, res) => {
        try {
            const { title, body } = req.body;
            const post = {
                title: title,
                body: body,
                userId: req.user.id
            }
            return res.status(200).json({ new_post: await this.postService.savePost(post) });
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({ error: "Title is already taken" })
            } else {
                res.status(400).json({ error: e.message })
                console.log(e.message);

            }
        }
    }

    edit = async (req, res) => {
        try {
            let postUpdates = req.body;
            let postToEdit = await postService.servePostById(postUpdates.id);
            if (postToEdit.userId === req.user.id) {
                res.status(200).json({ success: await this.postService.editPost(postUpdates, postToEdit) });
            } else throw "This is not your post!";
        } catch (err) {
            res.status(400).json({ error: err });
        }
    }

    delete = async (req, res) => {
        try {
            let postId = req.params['postId'];
            let postToDelete = await this.postService.servePostById(postId)
            if (req.user.id === postToDelete.userId) {
                await this.postService.deletePost(postToDelete)
                res.status(200).json({ success: `Post #${postId} was deleted successfully!` });
            } else {
                throw "This is not your post!";
            }
        } catch (err) {
            res.json({ error: err });
            console.log("error: " + err);
        }
    }

    upvote = async (req, res) => {
        try {
            let postId = req.params['postId'];
            let postToUpVote = await this.postService.servePostById(postId)
            if (req.user.id !== postToUpVote.userId) {
                res.status(200).json({
                    upvoted: await this.postService.upVotePost(postToUpVote, req.user.id)
                });
            } else {
                throw "Can't vote on your own post!";
            }

        } catch (err) {
            res.json({ error: err.message });
            console.log("error: " + err.message);
        }
    }

    downvote = async (req, res) => {
        try {
            let postId = req.params['postId'];
            let postToDownVote = await this.postService.servePostById(postId)
            if (req.user.id !== postToDownVote.userId) {
                res.status(200).json({
                    downvoted: await this.postService.downVotePost(postToDownVote, req.user.id)
                });
            } else {
                throw "Can't vote on your own post!";
            }

        } catch (err) {
            res.json({ error: err.message });
            console.log("error: " + err.message);
        }
    }



}

const postController = new PostController(postService);

export { PostController, postController };