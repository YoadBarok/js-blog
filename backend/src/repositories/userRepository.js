import { User } from '../models/User.js';
import { CRUDRepository } from "./CRUDRepository.js";


class UserRepository extends CRUDRepository {

    constructor(User) {
        super(User);
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

}

const userRepository = new UserRepository(User);
export { userRepository };