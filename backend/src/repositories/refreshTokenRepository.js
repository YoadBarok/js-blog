import { RefreshToken } from "../models/RefreshTokens.js";
import { CRUDRepository } from "./CRUDRepository.js";

class RefreshTokenRepository extends CRUDRepository {

    constructor(RefreshToken) {
        super(RefreshToken);
    }

    async findByToken(token) {
        return await RefreshToken.findOne({ where: { token: token } });
    }

    async deleteAllByUserId(userId) {
        return await RefreshToken.destroy({ where: { userId: userId } });
    }

}

const refreshTokenRepository = new RefreshTokenRepository(RefreshToken);
export { refreshTokenRepository, RefreshTokenRepository };