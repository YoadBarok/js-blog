class UserRepository {
    users = [
        {
            id: 1,
            user_name: "Yoad",
            email: "testmail@mail.com",
            password: "strongPassword",
            verified: true,
            regToken: "",
            regTokenExpiration: ""
        },
        {
            id: 2,
            user_name: "Ruth",
            email: "testmail2@mail.com",
            password: "strongPassword",
            verified: false,
            regToken: "1234567",
            regTokenExpiration: "9999999999999999999"
        },
        {
            id: 3,
            user_name: "Eden",
            email: "testmail3@mail.com",
            password: "strongPassword",
            verified: true,
            regToken: "",
            regTokenExpiration: ""
        },

    ];

    findAll = () => {
        return this.users;
    }
    
    findById(id) {
        return this.users.find(user => user.id === id);
    }

    saveNew(user) {
        this.users.push(user);
        return user;
    }
}

const userRepository = new UserRepository();
export {userRepository};