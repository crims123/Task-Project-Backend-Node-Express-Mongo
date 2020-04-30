const { Router } = require('express');
const {
  addTask,
  getTaskByProject,
  updateTask,
  deleteTask,
} = require('../controllers/task.controller');

const router = Router();

router.route('/').post(addTask);

router.route('/:id').get(getTaskByProject).put(updateTask).delete(deleteTask);

module.exports = router;
