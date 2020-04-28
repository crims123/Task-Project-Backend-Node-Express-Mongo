const { Router } = require('express');
const { addUser, login } = require('../controllers/user.controller');
const {
  addUserValidator,
  loginValidator,
} = require('../middleware/validators');

const router = Router();

router.route('/').post(addUserValidator, addUser);

router.route('/login').post(loginValidator, login);

module.exports = router;
