import { RefreshToken } from "../models/RefreshTokens.js";
import { CRUDRepository } from "./CRUDRepository.js";
import {Op} from "sequelize";

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

    async deleteAllExpiredTokens() {
        const expiredTokens = await RefreshToken.findAll({
            where: {
                updatedAt: {
                    [Op.lt]: Date.now() - process.env.REFRESH_TOKEN_EXPIRY
                }
            }
        }
        )
        expiredTokens.forEach(async token => {
            await token.destroy();
        });
    }

}

const refreshTokenRepository = new RefreshTokenRepository(RefreshToken);
export { refreshTokenRepository, RefreshTokenRepository };