const { check } = require('express-validator');

const addUserValidator = [
  check('name', 'The name is mandatory').not().isEmpty(),
  check('email', 'Add a valid email').isEmail(),
  check('password', 'The password must be a minimum of 6 characters').isLength({
    min: 6,
  }),
];

const loginValidator = [
  check('email', 'Add a valid email').isEmail(),
  check('password', 'The password must be a minimum of 6 characters').isLength({
    min: 6,
  }),
];

const addProjectValidator = [
  check('name', 'The name is mandatory').not().isEmpty(),
];

module.exports = {
  addUserValidator,
  loginValidator,
  addProjectValidator,
};
