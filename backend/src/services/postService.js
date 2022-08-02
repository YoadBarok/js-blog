import { postRepository } from "../repositories/postRepository.js";

class PostService {

    constructor(postRepository) {
        this.postRepository = postRepository;
    }

    async serveAllPosts() {
        return await this.postRepository.findAllPosts();
    }

    async savePost(post) {
        return await this.postRepository.savePost(post);
    }

    async servePostsByUserId(userId) {
        return await this.postRepository.findAllPostsByUserId(userId);
    }

}

const postService = new PostService(postRepository);

export {PostService, postService};