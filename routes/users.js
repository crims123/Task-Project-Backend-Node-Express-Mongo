const { Router } = require('express');
const router = Router();
const { addUser, login } = require('../controllers/user.controller');
const { check } = require('express-validator');

router
  .route('/', [
    check('name', 'The name is mandatory').not().isEmpty(),
    check('email', 'Add a valid email').isEmail(),
    check(
      'password',
      'The password must be a minimum of 6 characters'
    ).isLength({ min: 6 }),
  ])
  .post(addUser);

router.route('/login').post(login);

module.exports = router;
