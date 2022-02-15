import { User } from '../models/User.js';

class UserRepository {

    async findAllUsers() {
        return await User.findAll();
    }

    async findUserById(id) {
        return await User.findOne({ where: { id: id } });
    }

    async findUserByEmail(email) {
        return await User.findOne({ where: { email: email } });
    }
    async findUserByUserName(userName) {
        return await User.findOne({ where: { user_name: userName } });
    }

    async findUserByRegToken(regToken) {
        return await User.findOne({ where: { regToken: regToken } });
    }

    async saveNewUser(user) {
        let userToSave = new User(user);
        userToSave.regTokenExpiration = Date.now() + 3600000;
        return await userToSave.save();
    }

    async updateUser(user) {
        return await user.save();
    }

}

const userRepository = new UserRepository();
export { userRepository };