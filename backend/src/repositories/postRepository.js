import { Post } from '../models/Post.js'

class PostRepository {

    async findAllPosts() {
        return await Post.findAll();
    }

    async savePost(post) {
        const postToSave = new Post(post);
        return await postToSave.save();
    }

    async findAllPostsByUserId(userId) {
        return await Post.findAll({where: {userId: userId}});
    }

}

const postRepository = new PostRepository();
export {PostRepository, postRepository};