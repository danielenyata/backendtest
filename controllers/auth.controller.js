const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { createJWT } = require('../helpers/create.jwt');

require('dotenv').config();

async function signup(req, res) {
    const { email, password, firstName, lastName, address } = req.body;

    if (!email || !password || !firstName || !lastName || !address) return res.status(400).json({
        error: 'All Fields must be filled.'
    });

    try {
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) return res.status(400).json({ message: "user already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, address, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = createJWT({ identifier: email, id: result._id });

        res.status(201).json({ result: result, message: 'user created', token: token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function signin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({
        'message': 'email and password are required'
    });

    const existingUser = await User.findOne({ email }).exec();
    if (!existingUser) return res.status(404).json({ message: 'user does not exist' });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(404).json({ message: 'Invalid user details' });

    const token = createJWT({ identifier: email, id: existingUser._id });
    res.status(200).json({ token: token });
}

module.exports = {
    signin,
    signup
};