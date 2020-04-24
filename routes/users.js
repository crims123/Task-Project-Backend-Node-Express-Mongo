const { Router } = require('express');
const router = Router();
const { addUser, login } = require('../controllers/user.controller');
const { check } = require('express-validator');

router
  .route('/')
  .post(
    [
      check('name', 'The name is mandatory').not().isEmpty(),
      check('email', 'Add a valid email').isEmail(),
      check(
        'password',
        'The password must be a minimum of 6 characters'
      ).isLength({ min: 6 }),
    ],
    addUser
  );

router
  .route('/login')
  .post(
    [
      check('email', 'Add a valid email').isEmail(),
      check(
        'password',
        'The password must be a minimum of 6 characters'
      ).isLength({ min: 6 }),
    ],
    login
  );

module.exports = router;
