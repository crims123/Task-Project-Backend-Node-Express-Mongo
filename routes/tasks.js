const { Router } = require('express');
const { addTask } = require('../controllers/task.controller');
const router = Router();

router.route('/').post(addTask);

module.exports = router;
