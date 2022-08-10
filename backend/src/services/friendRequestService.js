import { friendRequestRepository } from "../repositories/friendRequestRepository.js";

class FriendRequestService {
    constructor(friendRequestRepository) {
        this.friendRequestRepository = friendRequestRepository;
    }

    async saveNewFriendRequest(friendRequest) {
        if (friendRequest.requesterId != friendRequest.targetUserId) {
            return await this.friendRequestRepository.saveNew(friendRequest);
        } return "You can't send a friend request to yourself!";
    }

    async serveById(id) {
        return await this.friendRequestRepository.findById(id);
    }

    async checkExistingFriendRequest(friendRequest) {
        return await this.friendRequestRepository.existingFriendship(friendRequest);
    }

    async approveFriendShip(id, targetUserId) {
        let friendRequest = await this.friendRequestRepository.findById(id);
        if (friendRequest) {
            if (friendRequest.approved === false) {
                if (friendRequest.targetUserId === targetUserId) {
                    friendRequest.approved = true;
                    return await this.friendRequestRepository.update(friendRequest);
                } return "This request is not aimed for you!";
            } return "Request already approved!";
        } return "Invalid friend request id!";
    }

    async cancelFriendRequest(targetUserId, requesterId) {
        let friendRequest = await this.friendRequestRepository.findByTargetUserIdAndRequesterId(targetUserId, requesterId);
        if (friendRequest) {
            if (friendRequest.approved === false) {
                if (friendRequest.requesterId === requesterId) {
                    return await this.friendRequestRepository.destroy(friendRequest);
                } return "This request is not yours!";
            } return "Request already approved!";
        } return "Invalid friend request id!";
    }


}

const friendRequestService = new FriendRequestService(friendRequestRepository);

export { FriendRequestService, friendRequestService };