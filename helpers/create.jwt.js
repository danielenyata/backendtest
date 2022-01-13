const jwt = require('jsonwebtoken');

require('dotenv').config();

function createJWT({ identifier, id }) {
    return jwt.sign({ identifier, id }, process.env.TOKEN_SECRET, { expiresIn: '10m' });
}

module.exports = {
    createJWT
};