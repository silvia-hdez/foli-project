const User = require('../models/User.model');
const { StatusCodes } = require('http-status-codes');

//--- Crear usuario ---//

module.exports.create = (req, res, next) => {
  User.create(rerq.body)
    .then(userCreated => {
      res.status(StatusCodes.CREATED).json(userCreated);
    })
    .catch(next)
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
    .then( user => {
      if(!user) {
        next(createError(StatusCodes.NOT_FOUND, 'User not found'))
      } else {
        res.json(user)
      }
    })
    .catch(next)
}