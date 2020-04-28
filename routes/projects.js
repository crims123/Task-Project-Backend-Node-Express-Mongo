const { Router } = require('express');
const {
  addProject,
  getProjects,
  deleteProject,
} = require('../controllers/project.controller');
const verifyAuth = require('../middleware/verifyAuth');
const { addProjectValidator } = require('../middleware/validators');

const router = Router();

router
  .route('/')
  .post(verifyAuth, addProjectValidator, addProject)
  .get(verifyAuth, getProjects);

router.route('/:id').delete(deleteProject);

module.exports = router;
