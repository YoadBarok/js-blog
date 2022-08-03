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

    edit = async (req, res) => {
        try {
            let {postId, body} = req.body;
            let postToEdit = await this.postService.servePostById(postId)
            if (req.user.id === postToEdit.userId){
                postToEdit.body = body;
                res.status(200).json({success: await this.postService.editPost(postToEdit)});
            } else {
                res.status(403).json({error: "This is not your post!"});
            }
        } catch(err) {
            res.json({error: err.message});
            console.log("error: " + err.message);
        }
    }

    delete = async (req, res) => {
        try {
            let postId = req.params['postId'];
            let postToDelete = await this.postService.servePostById(postId)
            if (req.user.id === postToDelete.userId){
                await this.postService.deletePost(postToDelete)
                res.status(200).json({success: `Post #${postId} was deleted successfully!`});
            } else {
                res.status(403).json({error: "This is not your post!"});
            }
        } catch(err) {
            res.json({error: err.message});
            console.log("error: " + err.message);
        }
    }
    
    upvote = async (req, res) => {
        try {
            let postId = req.params['postId'];
            let postToUpVote = await this.postService.servePostById(postId)
            if (req.user.id !== postToUpVote.userId) {
                res.status(200).json({upvoted: await this.postService.upVotePost(postToUpVote, req.user.id)});
            } else {
                res.status(400).json({error: "Can't vote on your own post!"});
            }
            
        } catch (err) {
            res.json({error: err.message});
            console.log("error: " + err.message);
        }
    }
    
    downvote = async (req, res) => {
        try {
            let postId = req.params['postId'];
            let postToDownVote = await this.postService.servePostById(postId)
            if (req.user.id !== postToDownVote.userId) {
                res.status(200).json({upvoted: await this.postService.downVotePost(postToDownVote, req.user.id)});
            } else {
                res.status(400).json({error: "Can't vote on your own post!"});
            }
            
        } catch (err) {
            res.json({error: err.message});
            console.log("error: " + err.message);
        }
    }



}

const postController = new PostController(postService);

export { PostController, postController };