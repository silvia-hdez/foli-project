const User = require('../models/User.model');
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');


module.exports.login = (req, res, next) => {
  const loginError = createError(StatusCodes.UNAUTHORIZED, 'Email, telephone or password incorrect');
  const { email, password, userPhone } = req.body


  
  // if (!email || !password || !userPhone) {
  //   return next(loginError);
  // }
  

  //... Check email & telephone
  let query;
  if (email) {
    query = { email };
  } else {
    query = { userPhone };
  }

  User.findOne(query)
  
    .then(user => {
      if (!user) {
        return next(loginError);
      }

 //... Check password
      return user.checkPassword(password)
        .then(match => {
          if (!match) {
            return next(loginError)
          }
//... Emitir y firmar un token jwt con la info del usuario
          const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || 'test',
            {
              expiresIn: process.env.ENV === "PROD" ? '1h' : '24h'
            }
          )

          res.json({ accessToken: token })
        })
    })
    .catch(next)
}

module.exports.logout = (req, res, next) => {
 // const token = req.headers.authorization.split('')[1]
}