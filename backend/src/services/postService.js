import { postRepository } from "../repositories/postRepository.js";

class PostService {

    constructor(postRepository) {
        this.postRepository = postRepository;
    }

    async serveAllPosts() {
        return await this.postRepository.findAllPosts();
    }

    async servePostById(postId) {
        return await this.postRepository.findPostById(postId);
    }

    async savePost(post) {
        return await this.postRepository.savePost(post);
    }

    async editPost(post) {
        return await this.postRepository.editPost(post);
    }

    async deletePost(post) {
        await this.postRepository.deletePost(post);
    }

    async servePostsByUserId(userId) {
        return await this.postRepository.findAllPostsByUserId(userId);
    }

}

const postService = new PostService(postRepository);

export {PostService, postService};