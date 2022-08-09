import { Post } from '../models/Post.js'
import { CRUDRepository } from "./CRUDRepository.js";

class PostRepository extends CRUDRepository {

    constructor(Post) {
        super(Post);
    }

    async findAllPostsByUserId(userId) {
        return await Post.findAll({ where: { userId: userId } });
    }

}

const postRepository = new PostRepository(Post);
export { PostRepository, postRepository };