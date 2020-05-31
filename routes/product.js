const express = require('express');
const router = express.Router();

const { create } = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { userSignupValidator } = require('../validator');

router.post(
    '/product/create/:userID', 
    userSignupValidator,
    isAdmin,
    isAdmin,
    create
);

router.param('userId', userById);

module.exports = router;
