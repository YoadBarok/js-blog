import { postRepository } from "../repositories/postRepository.js";
import { voteRepository } from "../repositories/voteRepository.js";

class PostService {

    constructor(postRepository, voteRepository) {
        this.postRepository = postRepository;
        this.voteRepository = voteRepository;
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

    async upVotePost(post, userId) {
        await this.checkVote(post, true, userId);
        return await this.postRepository.editPost(post);
    }

    async downVotePost(post, userId) {
        await this.checkVote(post, false, userId);
        return await this.postRepository.editPost(post);
    }

    async checkVote(post, up, userId) {
        let existingVote = await this.voteRepository.findVoteByPostIdAndUserId(post.id, userId);
        if (existingVote) {
            if (existingVote.type === 'up') {
                existingVote.type = 'neutral';
                post.points--;
            } else if (existingVote.type === 'neutral') {
                existingVote.type = up ? 'up' : 'down';
                post.points += up ? 1 : -1;
            }
            else {
                existingVote.type = "neutral";
                post.points++;
            }
            await this.voteRepository.updateVote(existingVote);
        } else {
            post.points += up ? 1 : -1;
            await this.voteRepository.saveVote({
                userId: userId,
                postId: post.id,
                type: up ? "up" : "down"
            })
        }
    }
}

const postService = new PostService(postRepository, voteRepository);

export { PostService, postService };