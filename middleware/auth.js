const jwt = require('jsonwebtoken');

require('dotenv').config();

async function verifyJwt(req, res, next) {
    const authHeader = req.headers.authorization || req.header.Authorization;

    if (!authHeader?.startsWith('Bearer')) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.user = decoded;
        next();
    });
};

module.exports = {
    verifyJwt
};