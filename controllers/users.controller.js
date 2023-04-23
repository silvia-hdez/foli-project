const User = require("../models/User.model");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");

//--- Crear usuario ---//

module.exports.create = (req, res, next) => {
  console.log(JSON.stringify(req.body));
  const { email, password, fullName, userName, userPhone } = req.body;
  User.create({ email, password, fullName, userName, userPhone })
    .then((userCreated) => {
      res.status(StatusCodes.CREATED).json(userCreated);
    })
    .catch((err) => {
      console.log(err);
      res.status(StatusCodes.CONFLICT).json(err);
    });
};

//--- Obtener listado usuarios creados ---//

module.exports.list = (req, res, next) => {
  User.find()
    .then((users) => res.json(users))
    .catch(next);
};

//--- Obtener el usuario actual ---//

module.exports.getCurrentUser = (req, res, next) => {
  //console.log("users/me");
  User.findById(req.currentUserId)
    .populate("posts")
    .populate("saves")
    .populate("comments")
    .then((user) => {
      if (!user) {
        next(createError(StatusCodes.UNAUTHORIZED, "User not found"));
      } else {
        console.log('AQUI', JSON.stringify(user))
        res.json(user);
      }
    })
    .catch(next);
};

//---Obtener info otro usuario---//

module.exports.getInfoUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .populate("posts")
    .then((user) => {
      res.json(user);
    })
    .catch(next);
};

//---Editar usuario---//
module.exports.edit = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
  }
  User.findByIdAndUpdate(req.currentUserId, req.body, { new: true })
    .then((userUpdated) => {
      res.status(StatusCodes.OK).json(userUpdated);
    })
    .catch(next);
};

//---seguir a otro---//

module.exports.followUser = (req, res, next) => {
  const { userId } = req.params;
  User.findByIdAndUpdate(
    userId,
    { $push: { followers: req.currentUserId } },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return createError(StatusCodes.NOT_FOUND, "User not found");
      } else {
        User.findByIdAndUpdate(
          req.currentUserId,
          { $push: { following: userId } },
          { new: true }
        )
          .then((user) => {
            if (!user) {
              return createError(StatusCodes.NOT_FOUND, "User not found");
            } else {
              res.status(200).json(user);
            }
          })
          .catch(next);
      }
    })
    .catch(next);
};

//---Dejar de seguir---

module.exports.unFollowUser = (req, res, next) => {
  const { userId } = req.params;
  User.findByIdAndUpdate(
    userId,
    { $pull: { followers: req.currentUserId } },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return createError(StatusCodes.NOT_FOUND, "User not found");
      } else {
        User.findByIdAndUpdate(
          req.currentUserId,
          { $pull: { following: userId } },
          { new: true }
        )
          .then((user) => {
            if (!user) {
              return createError(StatusCodes.NOT_FOUND, "User not found");
            } else {
              res.status(200).json(user);
            }
          })
          .catch(next);
      }
    })
    .catch(next);
};

//---Listado de usuarios a los que sigo---//

module.exports.getFollowing = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .populate("following")
    .then((user) => {
      if (!user) {
        return createError(StatusCodes.NOT_FOUND, "User not found");
      } else {
        res.json(user.following);
      }
    })
    .catch(next);
};

//---Listado de usuarios que me siguen---//

module.exports.getFollowers = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .populate("followers")
    .then((user) => {
      if (!user) {
        return createError(StatusCodes.NOT_FOUND, "User not found");
      } else {
        res.json(user.followers);
      }
    })
    .catch(next);
};
