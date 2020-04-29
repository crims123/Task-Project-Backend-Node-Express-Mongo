const { Router } = require('express');
const { addUser, login, getUser } = require('../controllers/user.controller');
const verifyAuth = require('../middleware/verifyAuth');
const {
  addUserValidator,
  loginValidator,
} = require('../middleware/validators');

const router = Router();

router.route('/').post(addUserValidator, addUser).get(verifyAuth, getUser);

router.route('/login').post(loginValidator, login);

module.exports = router;
