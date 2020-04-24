const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const userCtrl = {};
const jwtFirma = 'mypass';
const User = require('../models/User');

userCtrl.addUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password, register } = req.body;

    const uniqueEmail = await User.findOne({ email });

    if (uniqueEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email has already been registered',
      });
    }

    const user = new User({
      name,
      email,
      password,
      register,
    });

    // Hash Password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    await user.save();

    res.json({
      success: true,
      message: 'User created',
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

userCtrl.login = async (req, res) => {
  const { Email, Contrasena } = req.body;

  const filtro = { Email, Contrasena };
  let usuario = await Usuario.findOne(filtro);

  if (usuario) {
    usuario.Contrasena = '';
    const token = jwt.sign(usuario.toObject(), jwtFirma);
    res.json({
      sucess: 'true',
      message: 'Usuario logueado',
      token,
    });
  } else {
    res.status(400).json({
      sucess: 'false',
      message: 'Usuario no encontrado',
    });
  }
};

module.exports = userCtrl;
