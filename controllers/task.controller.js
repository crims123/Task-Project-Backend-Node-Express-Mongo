const jwt = require('jsonwebtoken');
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
    const { id } = req.params;
  
    const project = await Project.findById(id);

    if (!project) {
      res.status(400).json({
        success: false,
        message: 'Invalid Project Id',
      });
    }

    const tasks = await Task.find({ projectId: id });

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

taskCtrl.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, state } = req.body;

    const task = await Task.findById(id);

    if (!task) {
      res.status(400).json({
        success: false,
        message: 'Task does not exist',
      });
    }

    task.name = name;
    task.state = state;

    await Task.findOneAndUpdate({ _id: id }, task);

    res.json({
      success: true,
      message: 'Task Updated',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

taskCtrl.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      res.status(400).json({
        success: false,
        message: 'Task does not exist',
      });
    }

    await Task.findOneAndRemove({ _id: id });

    res.json({
      success: true,
      message: 'Task Deleted',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

module.exports = taskCtrl;
