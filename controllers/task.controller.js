const jwt = require('jsonwebtoken');
const jwtSign = 'SECRET_PASS_QAZWSX';
const taskCtrl = {};
const Task = require('../models/Task');
const Project = require('../models/Project');

taskCtrl.addTask = async (req, res) => {
  try {
    const { name, projectId, state } = req.body;

    if (!name || !projectId) {
      res.status(400).json({
        success: false,
        message: 'Check the tasks values',
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(400).json({
        success: false,
        message: 'Project id not found',
      });
    }

    const uniqueName = await Task.find({ name });

    if (uniqueName.length !== 0) {
      res.status(400).json({
        success: false,
        message: 'The current task name exists',
      });
    }

    const { user } = jwt.verify(req.headers.authorization, jwtSign);

    if (project.author !== user.id) {
      res.status(400).json({
        success: false,
        message: 'You do not have permissions for this request',
      });
    }

    const task = new Task({ name, projectId, state });
    await task.save();

    res.json({
      success: true,
      message: 'Task Added',
      data: { task },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

taskCtrl.getTaskByProject = async (req, res) => {
  try {
    const { projectId } = req.body;
    const project = await Project.findById(projectId);

    if (!project) {
      res.status(400).json({
        success: false,
        message: 'Invalid Project Id',
      });
    }

    const tasks = await Task.find({ projectId });

    res.json({
      success: true,
      message: 'Tasks List',
      data: { tasks },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

module.exports = taskCtrl;
