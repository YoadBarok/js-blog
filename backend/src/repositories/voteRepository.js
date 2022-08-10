import { Vote } from "../models/Vote.js";
import { CRUDRepository } from "./CRUDRepository.js";


class VoteRepository extends CRUDRepository {

    constructor(Vote) {
        super(Vote)
    }

    async findVotesByUserId(userId) {
        return await Vote.findAll({ where: { userId: userId } });
    }

    async findVoteByPostIdAndUserId(postId, userId) {
        return await Vote.findOne({ where: { userId: userId , postId: postId} });
    }

}

const voteRepository = new VoteRepository(Vote);
export {VoteRepository, voteRepository};