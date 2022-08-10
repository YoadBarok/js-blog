import { voteRepository } from "../repositories/voteRepository.js";

class VoteService {
    constructor(voteRepository) {
        this.voteRepository = voteRepository;
    }

    async vote(post, up, userId) {
        let existingVote = await this.voteRepository.findVoteByPostIdAndUserId(post.id, userId);
        if (existingVote) {
            if (existingVote.type === 'up') {
                if (up) {
                    existingVote.type = 'neutral';
                    post.points--;
                } else {
                    existingVote.type = 'down';
                    post.points -= 2;
                }
            } else if (existingVote.type === 'neutral') {
                existingVote.type = up ? 'up' : 'down';
                post.points += up ? 1 : -1;
            } else if (existingVote.type === 'down') {
                if(up) {
                    existingVote.type = "up";
                    post.points += 2;
                } else {
                    existingVote.type = "neutral";
                    post.points++;
                }
            }
            await this.voteRepository.update(existingVote);
        } else {
            post.points += up ? 1 : -1;
            await this.voteRepository.saveNew({
                userId: userId,
                postId: post.id,
                type: up ? "up" : "down"
            })
        }
    }

}

const voteService = new VoteService(voteRepository);

export {VoteService, voteService};