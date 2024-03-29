import { userService } from '../services/userService.js';
import { emailService } from '../services/emailService.js';
import { template } from '../emailTemplates/newUser.js';
import { friendshipService } from '../services/friendshipService.js';


class UserController {

    getUserById = async (req, res) => {
        try {
            const user = await userService.serveUserById(req.params.userId);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    identify = async (req, res) => {
        try {
            const user = await userService.identifyUser(req.user.id)
            res.status(200).json(user);
        } catch (err) {
            console.log(err);
            res.status(400).json({ error: err.message });
        }
    }

    save = async (req, res) => {
        try {
            let user = await userService.createUser(req.body);
            emailService.sendEmail(user.email,
                "Buban blog - Verify account!",
                template(user.regToken)
            )
            res.status(200).json({
                message: `New user created with the name: ${user.user_name}, a confirmation email was sent to ${user.email}`,
                status: "success"
            })
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') return res.status(400).json({ error: "Username or email already in use!", status: "fail" });
            res.status(200).json({ error: err.message });
        }
    }

    verify = async (req, res) => {
        try {
            await userService.verifyUser(req.params.regToken);
            res.status(200).redirect(process.env.FRONTEND_URL);
        } catch (err) {
            res.status(400).json({ message: err })
        }
    }

    login = async (req, res) => {
        try {
            let user = await userService.serveUserByEmail(req.body.email);
            if (!user || !await userService.comparePasswords(req.body.password, user.password)) {
                res.status(400).json({ error: `Invalid credentials!` })
            } else {
                if (user.verified) {
                    const accesToken = userService.generateToken(user);
                    const refreshToken = await userService.generateRefresh(user);
                    res.status(200).json({ access_token: accesToken, refresh_token: refreshToken })
                } else {
                    res.status(400).json({ error: 'User is not verified!' })
                }
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({ error: `Invalid request!` })
        }
    }

    refreshToken = async (req, res) => {
        try{
            const token = req.body.token;
            if (token == null) {
                return res.sendStatus(401)
            }
            let optionalToken = await userService.refreshTokenRepository.findByToken(token);
            if (!optionalToken) {
                return res.sendStatus(403);
            }
            let response = await userService.verifyRefresh(token);
            if (response === "ERROR") return res.sendStatus(403);
            res.json(response);
        } catch (e) {
            console.log(e);
            res.status(400).json({error: e.message});
        }

    }

    sendFriendshipRequest = async (req, res) => {
        try {
            const friendship = {
                targetUserId: req.params.id,
                requesterId: req.user.id
            }
            const targetUser = await userService.serveUserById(friendship.targetUserId);
            if (targetUser) {
                if (! await friendshipService.checkExistingfriendship(friendship)) {
                    res.status(200).json({ message: await friendshipService.saveNewfriendship(friendship) });
                } else {
                    throw "friend request already sent";
                }
            } else {
                throw "invalid target user id" ;
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({ error: e })
        }
    }

    approveFriendshipRequest = async (req, res) => {
        try {
            let friendshipId = req.params.id;
            let targetUserId = req.user.id;
            res.status(200).json({
                message: await friendshipService.approveFriendShip(friendshipId, targetUserId)
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({ error: `Invalid request!` });
        }
    }

    rejectFriendshipRequest = async (req, res) => {
        try {
            let friendshipId = req.params.id;
            let targetUserId = req.user.id;
            res.status(200).json({message: await friendshipService.rejectfriendship(friendshipId, targetUserId)});
        } catch (e) {
            console.log(e);
            res.status(400).json({ error: `Invalid request!` });
        }
    }

    cancelFriendshipRequest = async (req, res) => {
        try {
            res.status(200).json({
                message: await friendshipService.cancelfriendship(req.params.id, req.user.id)
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({ error: `Invalid request!` })
        }
    }

    unfriend = async (req, res) => {
        try {
            let targetUserId = req.params.id;
            let requesterId = req.user.id;
            let unfriendAttempt = await friendshipService.unfriend(targetUserId, requesterId);
            if (typeof unfriendAttempt === 'string'){
                throw {message: unfriendAttempt};
            }else{
                res.status(200).json({message: `User #${targetUserId} was unfriended`});
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({ error: e.message});
        }
    }

}

const userController = new UserController(userService);
export { userController };