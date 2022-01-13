const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    creatorId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Inventory', inventorySchema);