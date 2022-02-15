import { RefreshToken } from "../models/RefreshTokens.js";

class RefreshTokenRepository {

    async findAllRefreshTokens() {
        return await RefreshToken.findAll();
    }

    async saveRefreshToken(token) {
        let tokenToSave = new RefreshToken(token);
        return await tokenToSave.save();
    }

    async deleteAllByUserId(userId) {
        return await RefreshToken.destroy({ where: { userId: userId } });
    }

}

const refreshTokenRepository = new RefreshTokenRepository();
export { refreshTokenRepository, RefreshTokenRepository };