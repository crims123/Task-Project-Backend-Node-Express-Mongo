const projectCtrl = {};
const Project = require('../models/Project');

projectCtrl.addProject = async (req, res) => {
  res.json({
    success: true,
    message: 'Project Added',
    data: 'test',
  });
};

module.exports = projectCtrl;
