import { FriendRequest } from "../models/FriendRequest.js";
import { CRUDRepository } from "./CRUDRepository.js";

class FriendRequestRepository extends CRUDRepository {
    constructor(FriendRequest) {
        super(FriendRequest);
    }

    async findByRequesterId(requesterId) {
        return await FriendRequest.findOne({where: {requesterId: requesterId}});
    }

    async findByTargetUserId(targetUserId) {
        return await FriendRequest.findOne({where: {targetUserId: targetUserId}});
    }

    async findByTargetUserIdAndRequesterId(targetUserId, requesterId) {
        return await FriendRequest.findOne({where: {targetUserId: targetUserId, requesterId: requesterId}});
    }

    async existingFriendship(friendRequest) {
        let firstCheck = await this.findByTargetUserIdAndRequesterId(friendRequest.requesterId, friendRequest.targetUserId);
        let secondCheck = await this.findByTargetUserIdAndRequesterId(friendRequest.targetUserId, friendRequest.requesterId);
        if (firstCheck || secondCheck) return true;
        return false;
    }
}

const friendRequestRepository = new FriendRequestRepository(FriendRequest);

export {FriendRequestRepository, friendRequestRepository};