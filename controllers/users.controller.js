const User = require('../models/User.model');
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');

//--- Crear usuario ---//

module.exports.create = (req, res, next) => {
  console.log(JSON.stringify(req.body))
  const { email, password, fullName, userName, userPhone } = req.body;
  User.create({ email, password, fullName, userName, userPhone })
    .then(userCreated => {
      res.status(StatusCodes.CREATED).json(userCreated);
    })
    .catch((err) => {
      res.status(StatusCodes.CONFLICT).json(err)
    })
}

//--- Obtener listado usuarios creados ---//

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(next)
}

//--- Obtener el usuario por Id ---//

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        next(createError(StatusCodes.NOT_FOUND, 'User not found'))
      } else {
        res.json(user);
      }
    })
    .catch(next)
}

//--- Obtener el usuario actual ---//

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUserId)
    .populate('posts')
    .then(user => {
      if (!user) {
        next(createError(StatusCodes.NOT_FOUND, 'User not found'))
      } else {
        res.json(user);
      }
    })
    .catch(next)
}