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