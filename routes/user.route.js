const express = require('express');
const { getUser, getAllUsers } = require('../controllers/user.controller');

const router = express.Router();


router.get('/', getAllUsers);
router.get('/:id', getUser);

module.exports = router;