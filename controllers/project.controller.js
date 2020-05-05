const jwt = require('jsonwebtoken');
const projectCtrl = {};
const Project = require('../models/Project');

projectCtrl.addProject = async (req, res) => {
  try {
    const { name } = req.body;

    const { user } = jwt.verify(req.headers.authorization, process.env.SECRET);

    const project = new Project({ name, author: user.id });
    await project.save();

    res.json({
      success: true,
      message: 'Project Added',
      data: { project },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

projectCtrl.getProjects = async (req, res) => {
  try {
    const { user } = jwt.verify(req.headers.authorization, process.env.SECRET);
    const projects = await Project.find({ author: user.id });

    res.json({
      success: true,
      message: 'Projects List',
      data: { projects },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

projectCtrl.deleteProject = async (req, res) => {
  try {
    const { user } = jwt.verify(req.headers.authorization, process.env.SECRET);
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(400).json({
        success: false,
        message: 'Check the project id',
      });
    }

    if (project.author !== user.id) {
      res.status(400).json({
        success: false,
        message: 'You do not have permissions for this request',
      });
    }

    await Project.findOneAndRemove({ _id: req.params.id });

    res.json({
      success: true,
      message: 'Project Deleted',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

module.exports = projectCtrl;
