const { Router } = require('express');
const router = Router();
const { addUser, login } = require('../controllers/user.controller');

router.route('/')
    .post(addUser)

router.route('/login')
    .post(login);

module.exports = router;