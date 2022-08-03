import { userService } from '../services/userService.js';
import { emailService } from '../services/emailService.js';
import { template } from '../emailTemplates/newUser.js';


class UserController {

    identify = async (req, res) => {
        try {
            res.status(200).json(await userService.identifyUser(req.user.id));
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    save = async (req, res) => {
        try {
            let user = await userService.createUser(req.body);
            await emailService.sendEmail(user.email,
                "Login app - Verify account!",
                template(user.regToken)
            )
            res.status(200).json({
                message: `New user created with the name: ${user.user_name}, a confirmation email was sent to ${user.email}`
            })
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') return res.status(400).json({error: "Username or email already in use!"});
            res.status(200).json({ error: err.message });
        }
    }

    verify = async (req, res) => {
        try {
            let answer = await userService.verifyUser(req.params.regToken);
            res.status(200).json({ message: answer })
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }

    login = async (req, res) => {
        try {
            let user = await userService.serveUserByUserName(req.body.user_name);
            if (!user || !await userService.comparePasswords(req.body.password, user.password)) {
                res.status(200).json({ error: `Invalid credentials!` })
            } else {
                if (user.verified) {
                    const accesToken = userService.generateToken(user);
                    const refreshToken = await userService.generateRefresh(user);
                    res.status(200).json({ access_token: accesToken, refresh_token: refreshToken })
                } else {
                    res.status(200).json({ error: 'User is not verified!' })
                }
            }
        } catch (e) {
            console.log(e)
            res.status(200).json({ error: `Invalid request!` })
        }
    }

    refreshToken = async (req, res) => {
        const token = req.body.token;
        if (token == null) {
            return res.sendStatus(401)
        }
        let allTokens = await userService.refreshTokenRepository.findAllRefreshTokens();
        if (! allTokens.find( t => t.token === token)) {
            return res.sendStatus(403);
        }
        let response = userService.verifyRefresh(token)
        if (response === "ERROR") return res.sendStatus(403);
        res.json({accessToken: response });

    }

}

const userController = new UserController(userService);
export { userController };