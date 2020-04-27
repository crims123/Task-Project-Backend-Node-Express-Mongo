const { Router } = require('express');
const { addTask, getTaskByProject } = require('../controllers/task.controller');
const router = Router();

router.route('/').post(addTask).get(getTaskByProject);

module.exports = router;
