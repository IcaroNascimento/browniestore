const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

const { userById } = require('../controllers/user');

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (request, response) =>{
    response.json({
        user: request.profile
    })
});

router.param('userId', userById);

module.exports = router;
