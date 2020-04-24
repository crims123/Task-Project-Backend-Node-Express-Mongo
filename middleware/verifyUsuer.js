const jwt = require('jsonwebtoken');
const verifyLoginMd = {};
const jwtFirma = 'mypass';

verifyLoginMd.verify = (req, res, next) => {
    try {
        jwt.verify(req.headers.authorization, jwtFirma);
        next();
    } catch {
        res.status(404).json('jwt invalidos');
    }
}

module.exports = verifyLoginMd;