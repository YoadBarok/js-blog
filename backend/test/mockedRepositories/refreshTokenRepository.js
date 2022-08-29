class RefreshTokenRepository {

    tokens = [
        {
            id: 1,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlck5hbWUiOiJZb2FkIiwiaWF0IjoxNjYxNzYxMjUwfQ.LlhuHPX0vxi6rfNo9iI--S_2OQvFEQCBxJ3BNOxky1I",
            userId: 1
        }
    ];

    findByToken(token) {
        return this.tokens.find(t => t.token === token);
    }

    deleteAllByUserId(userId) {
        this.tokens = this.tokens.filter(t => t.userId !== userId);
        return this.tokens;
    }

    saveNew(token) {
        this.tokens.push(token);
    }
}

const refreshTokenRepository = new RefreshTokenRepository();
export { refreshTokenRepository };