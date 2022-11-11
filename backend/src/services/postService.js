import { postRepository } from "../repositories/postRepository.js";
import {voteService} from "./voteService.js";

class PostService {

    constructor(postRepository, voteService) {
        this.postRepository = postRepository;
        this.voteService = voteService;
    }

    async serveAllPosts() {
        return await this.postRepository.findAll();
    }

    async servePostById(postId) {
        return await this.postRepository.findById(postId);
    }

    async savePost(post) {
        return await this.postRepository.saveNew(post);
    }

    async editPost(postUpdates, postToEdit) {
            let fieldsToUpdate = Object.keys(postUpdates).filter(field => field != "id");
            fieldsToUpdate.forEach(field => {
                postToEdit[field] = postUpdates[field];
            })
            return await this.postRepository.update(postToEdit);
    }

    async deletePost(post) {
        await this.postRepository.destroy(post);
    }

    async servePostsByUserId(userId) {
        return await this.postRepository.findAllPostsByUserId(userId);
    }

    async upVotePost(post, userId) {
        if (post.userId === userId) return "can't vote on your own post";
        await this.voteService.vote(post, true, userId);
        return await this.postRepository.update(post);
    }

    async downVotePost(post, userId) {
        if (post.userId === userId) return "can't vote on your own post";
        await this.voteService.vote(post, false, userId);
        return await this.postRepository.update(post);
    }

}

const postService = new PostService(postRepository, voteService);

export { PostService, postService };