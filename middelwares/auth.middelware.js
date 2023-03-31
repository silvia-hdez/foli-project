const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');

module.exports.isAuthenticated = (req, res, next) => {
  const authorization = req.header('Authorization')

  if (!authorization) {
    return next(createError(StatusCodes.UNAUTHORIZED, 'Authorization header was not provided'))
  }

  const [schema, token] = authorization.split(' '); // Deberia haberme llegado Bearer token

  if (schema !== 'Bearer') {
    return next(createError(StatusCodes.UNAUTHORIZED, 'Authorization schema is not supported'))
  }

  if (!token) {
    return next(createError(StatusCodes.UNAUTHORIZED, 'A token must be provided'))
  }

  // Me aseguro que tengo schema y tengo token

  // a comprobarlo con JWT
  const secret = process.env.JWT_SECRET || 'test'
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return next(err)
    }

    req.currentUserId = decodedToken.id
    next()
  })
}