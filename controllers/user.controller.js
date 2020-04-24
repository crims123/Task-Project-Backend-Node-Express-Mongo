const jwt = require('jsonwebtoken');
const usuarioCtrl = {};
const jwtFirma = 'mypass';
const User = require('../models/User');

usuarioCtrl.addUser = async (req, res) => {
    console.log(req.body)
    const { Nombre, Apellido, Email, Contrasena } = req.body;
    const usuario = new User({
        Nombre,
        Apellido,
        Email,
        Contrasena
    });
    await usuario.save();
    res.json({
        sucess: 'true',
        message: 'Usuario creado'
    });
}

usuarioCtrl.login = async (req, res) => {
    const { Email, Contrasena } = req.body;

    const filtro = { Email, Contrasena };
    let usuario = await Usuario.findOne(filtro);

    if (usuario) {
        usuario.Contrasena = '';
        const token = jwt.sign(usuario.toObject(), jwtFirma);
        res.json({
            sucess: 'true',
            message: 'Usuario logueado',
            token
        });
    } else {
        res.status(400).json({
            sucess: 'false',
            message: 'Usuario no encontrado'
        });
    }
}

module.exports = usuarioCtrl;