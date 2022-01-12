const express = require('express');
const { createItem, updateItem, getAllItems, getItem, deleteItem } = require('../controllers/inventory.controller');
const { verifyJWT } = require('../middleware/auth');

const router = express.Router();

router.get('/', verifyJWT, getAllItems);
router.get('/:id', verifyJWT, getItem);
router.post('/', verifyJWT, createItem);
router.put('/', verifyJWT, updateItem);
router.delete('/', verifyJWT, deleteItem);

module.exports = router;