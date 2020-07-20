const express = require('express');
const router = express.Router();

const {create} = require('../controllers/category');
const {userSignupValidator} = require('../validator/index')

router.post('/category/create', create);

module.exports = router;