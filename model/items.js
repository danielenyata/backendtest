
const mongoose = require("mongoose");


const itemSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true

    },
    description:{
        type:String
    },
    img:{},
    price:{
        type:Number
    }
})

const Item = mongoose.model("item", itemSchema)

module.exports = Item