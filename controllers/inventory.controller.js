const Inventory = require('../models/inventory.model');


async function createItem(req, res) {
    let user = req.user;
    const item = req.body;

    const newItem = new Inventory({
        ...item,
        image: req.file.filename,
        creatorId: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });

    try {
        await newItem.save();

        res.status(201).json({ result: newItem, message: 'Item Created' });
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

async function updateItem(req, res) {
    if (!req?.body.id) return res.status(400).json({ message: 'ID parameter is required.' });

    const item = await Inventory.findOne({ _id: req.body.id }).exec();

    if (!item) return res.status(204).json({ message: `No item matches ID ${req.body.id}` });

    if (req.body?.name) item.name = req.body.name;
    if (req.body?.quantity) item.quantity = req.body.quantity;
    if (req.file?.filename) item.image = req.file.filename;
    if (req.body?.description) item.description = req.body.description;
    item.updatedAt = new Date().toISOString();

    const result = await item.save();
    res.status(200).json({ result, message: 'Item updated' });

}

async function getAllItems(req, res) {
    try {
        const items = await Inventory.find({}).exec();
        res.status(200).json({ result: items });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

};

async function getItem(req, res) {
    const { id } = req.params;
    try {
        const item = await Inventory.findById(id).exec();
        if (!item) return res.status(204).json({ message: `No item matches ID ${id}` });

        res.status(200).json({ result: item });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

async function deleteItem(req, res) {
    if (!req?.body?.id) return res.status(400).json({ message: 'Item ID required.' });

    const item = await Inventory.findOne({ _id: req.body.id }).exec();

    if (!item) return res.status(204).json({ message: `No item matches ID ${req.body.id}` });

    await Inventory.findByIdAndRemove(item._id);
    res.status(200).json({ message: 'item deleted' });
};


module.exports = {
    createItem,
    updateItem,
    getAllItems,
    getItem,
    deleteItem
};

