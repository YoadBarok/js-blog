import { userRepository } from "../repositories/userRepository.js";
import { refreshTokenRepository } from "../repositories/refreshTokenRepository.js";
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

class UserService {

    constructor(userRepository, refreshTokenRepository) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    serveAllRefreshTokens() {
        // CHANGE TO DB QUERY!!!!
        return this.refreshTokens;
    }

    async serveAllUsers() {
        return await this.userRepository.findAllUsers();
    }

    async serveUserById(id) {
        return await this.userRepository.findUserById(id);
    }

    async createUser(user) {
        user.password = await bcrypt.hash(user.password, 10);
        user.regToken = Math.round(Math.random() * 9000000000);
        return await this.userRepository.saveNewUser(user);
    }

    async serveUserByUserName(userName) {
        return await this.userRepository.findUserByUserName(userName);
    }

    async verifyUser(regToken) {
        let userToVerify = await this.userRepository.findUserByRegToken(regToken);
        if (userToVerify) {
            return userToVerify.regTokenExpiration < Date.now() ?
                "Registration token expired" :
                (async () => {
                    userToVerify.verified = true;
                    userToVerify.regToken += 'verified' + (Math.round(Math.random() * 900000));
                    let user = await this.userRepository.updateUser(userToVerify);
                    return user.user_name + ' has been successfully verified!';
                })();
        } else {
            return "Whoops! Looks like you're already verified!"
        }
    }

    verifyRefresh(token) {
        let output = jsonwebtoken.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return "ERROR";
            user = { id: user.id, user_name: user.userName }
            let accessToken = this.generateToken(user);
            return accessToken;
        })
        return output
    }

    async comparePasswords(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }

    generateToken(user) {
        let valuesToSign = {
            id: user.id,
            userName: user.user_name
        }
        var token = jsonwebtoken.sign(valuesToSign, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1s' })
        return token;
    }

    async generateRefresh(user) {
        let valuesToSign = {
            id: user.id,
            userName: user.user_name
        }
        await this.refreshTokenRepository.deleteAllByUserId(user.id);
        var token = jsonwebtoken.sign(valuesToSign, process.env.REFRESH_TOKEN_SECRET)
        await this.refreshTokenRepository.saveRefreshToken({token: token, userId: user.id});
        return token;
    }

    async identifyUser(userId) {
        let users = await this.serveAllUsers();
        let mappedUsers = users.map(user => {
            return {
                id: user.id,
                user_name: user.user_name,
                email: user.email
            };
        });
        return mappedUsers.filter(u => u.id === userId);
    }

}

const userService = new UserService(userRepository, refreshTokenRepository);
export { userService, UserService };