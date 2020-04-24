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

module.exports = projectCtrl;
