const User = require('../models/user.model');

async function getUser(req, res) {
    const { id } = req.params;

    try {
        const user = await User.findById(id).exec();
        if (!user) return res.status(204).json({ message: `No user matches ID ${id}` });

        res.status(200).json({ result: user });

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find({}).exec();
        res.status(200).json({ result: users });

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};


module.exports = {
    getUser,
    getAllUsers
};

