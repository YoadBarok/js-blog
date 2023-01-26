import jsonwebtoken from 'jsonwebtoken';

function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401);
        jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err.message);
                return res.sendStatus(403);  
            } 
            req.user = user;
            next();
        })
    } catch (error) {
        console.log(error);
    }
}

export { authenticateToken };