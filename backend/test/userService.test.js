import {UserService} from "../src/services/userService.js";
import {userRepository} from "./mockedRepositories/userRepository.js";

const  userService = new UserService(userRepository);

describe("User repository tests", () => {
    test("Users list should have 3 users", async () => {
        let users = await userService.serveAllUsers()
        expect(users.length).toBe(3);
    });
    test("User id 1 belongs to Yoad", async () => {
        let yoad = await userService.serveUserById(1);
        expect(yoad.user_name).toBe("Yoad");
    });
    test("Adding a new user increases the user count to 4", async () => {
        await userService.createUser({
            id: 4,
            user_name: "Shoshi",
            email: "shoshmail@mail.com",
            password: "woofwoof"
        });
        let usersWithShoshi = await userService.serveAllUsers()
        expect(usersWithShoshi.length).toBe(4);
        expect(usersWithShoshi.some(user => user.user_name === "Shoshi")).toBeTruthy();
    })
})
