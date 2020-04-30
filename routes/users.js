const { Router } = require('express');
const { addUser, login, getUser } = require('../controllers/user.controller');
const verifyAuth = require('../middleware/verifyAuth');

const router = Router();

router.route('/').post(addUser).get(verifyAuth, getUser);

router.route('/login').post(login);

module.exports = router;
