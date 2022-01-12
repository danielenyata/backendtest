const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;