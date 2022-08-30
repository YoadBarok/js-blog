import { Friendship } from "../models/friendship.js";
import { CRUDRepository } from "./CRUDRepository.js";

class FriendshipRepository extends CRUDRepository {
    constructor(Friendship) {
        super(Friendship);
    }

    async findByRequesterId(requesterId) {
        return await Friendship.findOne({where: {requesterId: requesterId}});
    }

    async findByTargetUserId(targetUserId) {
        return await Friendship.findOne({where: {targetUserId: targetUserId}});
    }

    async findByTargetUserIdAndRequesterId(targetUserId, requesterId) {
        return await Friendship.findOne({where: {targetUserId: targetUserId, requesterId: requesterId}});
    }

    async existingFriendship(friendship) {
        let firstCheck = await this.findByTargetUserIdAndRequesterId(friendship.requesterId, friendship.targetUserId);
        let secondCheck = await this.findByTargetUserIdAndRequesterId(friendship.targetUserId, friendship.requesterId);
        if (firstCheck || secondCheck) return true;
        return false;
    }
}

const friendshipRepository = new FriendshipRepository(Friendship);

export {FriendshipRepository, friendshipRepository};