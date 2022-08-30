import { friendshipRepository } from "../repositories/friendshipRepository.js";

class FriendshipService {
    constructor(friendshipRepository) {
        this.friendshipRepository = friendshipRepository;
    }

    async saveNewfriendship(friendship) {
        if (friendship.requesterId != friendship.targetUserId) {
            return await this.friendshipRepository.saveNew(friendship);
        } return "You can't send a friend request to yourself!";
    }

    async serveById(id) {
        return await this.friendshipRepository.findById(id);
    }

    async checkExistingfriendship(friendship) {
        return await this.friendshipRepository.existingFriendship(friendship);
    }

    async approveFriendShip(id, targetUserId) {
        let friendship = await this.friendshipRepository.findById(id);
        if (friendship) {
            if (!friendship.approved) {
                if (friendship.targetUserId === targetUserId) {
                    friendship.approved = true;
                    return await this.friendshipRepository.update(friendship);
                } return "This request is not aimed for you!";
            } return "Request already approved!";
        } return "Invalid friend request id!";
    }

    async rejectfriendship(id, targetUserId) {
        let friendship = await this.friendshipRepository.findById(id);
        if (friendship) {
            if (!friendship.approved) {
                if (friendship.targetUserId === targetUserId) {
                    await this.friendshipRepository.destroy(friendship);
                    return `friend request #${friendship.id} has been rejected successfully!`;
                } return "This request is not aimed for you!";
            } return "Request already approved!";
        } return "Invalid friend request id!";
    }

    async cancelfriendship(targetUserId, requesterId) {
        let friendship = await this.friendshipRepository.findByTargetUserIdAndRequesterId(targetUserId, requesterId);
        if (friendship) {
            if (friendship.approved === false) {
                if (friendship.requesterId === requesterId) {
                    return await this.friendshipRepository.destroy(friendship);
                } return "This request is not yours!";
            } return "Request already approved!";
        } return "Invalid friend request id!";
    }

    async unfriend(targetUserId, requesterId){
        let friendship = await this.friendshipRepository.findByTargetUserIdAndRequesterId(targetUserId, requesterId);
        if (friendship) return await this.friendshipRepository.destroy(friendship);
        friendship = await this.friendshipRepository.findByTargetUserIdAndRequesterId(requesterId, targetUserId);
        if (friendship) return await this.friendshipRepository.destroy(friendship);
        else return "friendship request error: user with targetUserId is not your friend";
    }    
}

const friendshipService = new FriendshipService(friendshipRepository);

export { FriendshipService, friendshipService };