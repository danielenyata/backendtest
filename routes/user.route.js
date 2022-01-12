const express = require('express');
const { getUser, getAllUsers } = require('../controllers/user.controller');
const { verifyJWT } = require('../middleware/auth');

const router = express.Router();


router.get('/', verifyJWT, getAllUsers);
router.get('/:id', verifyJWT, getUser);

module.exports = router;