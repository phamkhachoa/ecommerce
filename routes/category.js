const express = require('express');
const router = express.Router();

const {create, categoryById, remove, update} = require('../controllers/category');
const {requireSignin, isAuth, isAdmin} = require('../controllers/auth');
const {userById} = require('../controllers/user');

router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.get('/category/:categoryId', categoryById);
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;