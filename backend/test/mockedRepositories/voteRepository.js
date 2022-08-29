class VoteRepository {

    votes = [];

    findVoteByPostIdAndUserId(postId, userId) {
        return this.votes.find(v => v.postId === postId && v.userId === userId);
    }

    update(vote) {
        let indexToUpdate = this.votes.indexOf(this.votes.find(v => v.id === vote.id));
        this.votes.splice(indexToUpdate, 1, vote);
        return vote;
    }

    saveNew(vote) {
        this.votes.push(vote);
        return vote;
    }


}
const voteRepository = new VoteRepository();
export {voteRepository};