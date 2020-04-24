const { Router } = require('express');
const router = Router();
const { addProject } = require('../controllers/project.controller');

router
  .route('/')
  .post(addProject);

module.exports = router;
