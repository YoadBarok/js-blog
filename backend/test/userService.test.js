import { UserService } from "../src/services/userService.js";
import { userRepository } from "./mockedRepositories/userRepository.js";
import { refreshTokenRepository } from "./mockedRepositories/refreshTokenRepository.js";

const userService = new UserService(userRepository, refreshTokenRepository);



describe('Set env variables', () => {
    const env = process.env

    beforeEach(() => {
        jest.resetModules()
        process.env = { ...env }
        process.env.REFRESH_TOKEN_SECRET = "abcdefg1234567";
        process.env.ACCESS_TOKEN_SECRET = "abcdefgh12345678";
    })

    afterEach(() => {
        process.env = env
    })

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

    describe("verifyUser tests", () => {
        test("should change reg token to empty string", async () => {
            await userService.verifyUser("1234567");
            let userToVerify = await userService.serveUserById(2);
            expect(userToVerify.regToken).toBe("");
            expect(userToVerify.verified).toBeTruthy();
        });
        test("result should contain 'Whoops!'", async () => {
            let userToVerify = await userService.verifyUser("");
            let containsWhoops = userToVerify.indexOf("Whoops") !== -1;
            expect(containsWhoops).toBeTruthy();
        })
    })

    describe("verifyRefresh tests", () => {
        test("Provided token should provide new access token & refresh token", async () => {
            const providedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlck5hbWUiOiJZb2FkIiwiaWF0IjoxNjYxNzYxMjUwfQ.LlhuHPX0vxi6rfNo9iI--S_2OQvFEQCBxJ3BNOxky1I";
            const newTokens = await userService.verifyRefresh(providedToken);
            expect(newTokens.accessToken).toBeTruthy();
            expect(newTokens.refreshToken).toBeTruthy();
            expect(userService.refreshTokenRepository.findByToken(providedToken)).toBeFalsy();
        });
        test("Should return: 'No such token!'", async () => {
            expect(await userService.verifyRefresh("blabla")).toBe("No such token!");
        })
    })

})