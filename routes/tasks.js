const { Router } = require('express');
const {
  addTask,
  getTaskByProject,
  updateTask,
  deleteTask,
} = require('../controllers/task.controller');
const router = Router();

router.route('/').post(addTask).get(getTaskByProject);

router.route('/:id').put(updateTask).delete(deleteTask);

module.exports = router;
