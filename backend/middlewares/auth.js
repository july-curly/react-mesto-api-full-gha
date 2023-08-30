const jwt = require('jsonwebtoken');

const { SECRET = 'SECRET' } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  console.log(SECRET);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    throw new UnauthorizedError(`Необходима авторизация ${SECRET}`);
  }

  req.user = payload;

  next();
};

module.exports = auth;
