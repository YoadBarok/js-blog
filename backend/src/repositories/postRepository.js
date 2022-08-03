import { Post } from '../models/Post.js'

class PostRepository {

    async findAllPosts() {
        return await Post.findAll();
    }

    async findPostById(id) {
        return await Post.findOne({where: {id: id}});
    }

    async savePost(post) {
        const postToSave = new Post(post);
        return await postToSave.save();
    }

    async editPost(post) {
        return await post.save();
    }

    async deletePost(post) {
        return await post.destroy();
    }

    async findAllPostsByUserId(userId) {
        return await Post.findAll({where: {userId: userId}});
    }

}

const postRepository = new PostRepository();
export {PostRepository, postRepository};