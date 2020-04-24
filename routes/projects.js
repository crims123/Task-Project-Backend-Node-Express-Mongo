const { Router } = require('express');
const { check } = require('express-validator');
const { addProject } = require('../controllers/project.controller');
const verifyAuth = require('../middleware/verifyAuth');

const router = Router();

router
  .route('/')
  .post(
    verifyAuth,
    [check('name', 'The name is mandatory').not().isEmpty()],
    addProject
  );

module.exports = router;
