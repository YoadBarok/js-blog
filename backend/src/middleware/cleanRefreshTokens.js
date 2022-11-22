const EXIPRATION = process.env.REFRESH_TOKEN_EXPIRY;
import { refreshTokenRepository } from '../repositories/refreshTokenRepository.js';

const cleanExpiredRefreshTokens = async () => {
    const expiredTokens = await refreshTokenRepository.deleteAllExpiredTokens();
}


export { cleanExpiredRefreshTokens };