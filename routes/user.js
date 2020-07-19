const express = require('express');
const router = express.Router();

const {userById} = require('../controllers/user');
const {requireSignin} = require('../controllers/auth');

router.get('/secret/:userId', requireSignin, userById);

router.param('userId', userById);

module.exports = router;