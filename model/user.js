
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true

    },
    lastName:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }

}, {timestamps: true})


const User = mongoose.model("user", userSchema)
module.exports = User