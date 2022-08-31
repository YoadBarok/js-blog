import { userRepository } from "../repositories/userRepository.js";
import { refreshTokenRepository } from "../repositories/refreshTokenRepository.js";
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

class UserService {

    constructor(userRepository, refreshTokenRepository) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    async serveAllUsers() {
        return await this.userRepository.findAll();
    }

    async serveUserById(id) {
        return await this.userRepository.findById(id);
    }

    async createUser(user) {
        user.password = await bcrypt.hash(user.password, 10);
        user.regToken = Math.round(Math.random() * 9000000000);
        user.regTokenExpiration = Date.now() + 3600000;
        return await this.userRepository.saveNew(user);
    }

    async serveUserByUserName(userName) {
        return await this.userRepository.findUserByUserName(userName);
    }

    async verifyUser(regToken) {
        let userToVerify = await this.userRepository.findUserByRegToken(regToken);
        if (userToVerify && !userToVerify.verified) {
            if (userToVerify.regTokenExpiration < Date.now()) {
                return "Registration token expired";
            } else {
                userToVerify.verified = true;
                userToVerify.regToken = "";
                userToVerify.regTokenExpiration = "";
                let user = await this.userRepository.update(userToVerify);
                return user.user_name + ' has been successfully verified!';
            }
        } else {
            return "Whoops! Looks like you're already verified!"
        }
    }

    async verifyRefresh(token) {
        let tokenObject = await this.refreshTokenRepository.findByToken(token);
        if (!tokenObject) return "No such token!";
        let user = await this.serveUserById(tokenObject.userId);
        let newAccessToken = jsonwebtoken.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return "ERROR";
            user = { id: user.id, user_name: user.userName }
            let accessToken = this.generateToken(user);
            return accessToken;
        })
        let newRefreshToken = await this.generateRefresh(user);
        return { accessToken: newAccessToken, refreshToken: newRefreshToken }
    }

    async comparePasswords(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }

    generateToken(user) {
        let valuesToSign = {
            id: user.id,
            userName: user.user_name
        }
        var token = jsonwebtoken.sign(valuesToSign, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' })
        return token;
    }

    async generateRefresh(user) {
        let valuesToSign = {
            id: user.id,
            userName: user.user_name
        }
        await this.refreshTokenRepository.deleteAllByUserId(user.id);
        var token = jsonwebtoken.sign(valuesToSign, process.env.REFRESH_TOKEN_SECRET)
        await this.refreshTokenRepository.saveNew({ token: token, userId: user.id });
        return token;
    }

    async identifyUser(userId) {
        let user = await this.serveUserById(userId);
        return {
            id: user.id,
            user_name: user.user_name,
            email: user.email
        };
    }

}

const userService = new UserService(userRepository, refreshTokenRepository);
export { userService, UserService };