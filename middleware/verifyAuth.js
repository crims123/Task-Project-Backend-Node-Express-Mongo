const jwt = require('jsonwebtoken');
const jwtSign = 'SECRET_PASS_QAZWSX';

const verifyAuth = (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization, jwtSign);
    next();
  } catch {
    res.status(404).json({
      success: false,
      message: 'Invalid json web token',
    });
  }
};

module.exports = verifyAuth;
