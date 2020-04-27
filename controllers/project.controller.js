const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const jwtSign = 'SECRET_PASS_QAZWSX';
const projectCtrl = {};
const Project = require('../models/Project');

projectCtrl.addProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;

    const decryptToken = jwt.verify(req.headers.authorization, jwtSign);

    const project = new Project({ name, author: decryptToken.user.id });
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
    const decryptToken = jwt.verify(req.headers.authorization, jwtSign);
    const userId = decryptToken.user.id;

    const projects = await Project.find({ author: userId });

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
    const { user } = jwt.verify(req.headers.authorization, jwtSign);
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(400).json({
        success: false,
        message: 'Check the project id',
      });
    }

    if (project.author !== user.id) {
      console.log('ENTRO IF');
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
