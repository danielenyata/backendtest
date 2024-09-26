const express = require('express');
const { createItem, updateItem, getAllItems, getItem, deleteItem } = require('../controllers/inventory.controller');
const { upload } = require('../middleware/image.upload');

const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getItem);
router.post('/', upload.single('image'), createItem);
router.put('/', upload.single('image'), updateItem);
router.delete('/', deleteItem);

module.exports = router;