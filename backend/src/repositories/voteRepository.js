import { Vote } from "../models/Vote.js";

class VoteRepository {

    async findAllVotes() {
        return await Vote.findAll();
    }

    async findVotesByUserId(userId) {
        return await Vote.findAll({ where: { userId: userId } });
    }

    async findVoteByPostIdAndUserId(postId, userId) {
        return await Vote.findOne({ where: { userId: userId , postId: postId} });
    }

    async saveVote(voteObject) {
        let voteToSave = new Vote(voteObject);
        return await voteToSave.save();
    }

    async updateVote(vote) {
        return await vote.save();
    }

}

const voteRepository = new VoteRepository();
export {VoteRepository, voteRepository};