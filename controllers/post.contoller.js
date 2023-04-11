const { StatusCodes } = require("http-status-codes");
const PostPlant = require("../models/PostPlant.model");
const User = require("../models/User.model");

//---Crear post--//

module.exports.create = (req, res, next) => {
  const { name, image, description, comments, state } = req.body;

  console.log(req.currentUserId, req.body, req.files);
  if (req.files) {
    req.body.image = req.files.map((file) => file.path);
  }

  User.findById(req.currentUserId)
    .then((user) => {
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send("User no encontrado");
      }
      return PostPlant.create({
        name,
        image,
        user,
        description,
        comments,
        state,
      });
    })
    .then((newPost) => {
      res.status(StatusCodes.CREATED).json(newPost);
    })
    .catch(next);
};

//---Obtener listado posts---//

module.exports.listPosts = (req, res, next) => {
  const userId = req.currentUserId;
  PostPlant.find({ user: { $ne: userId } })
    .populate("user")
    .then((posts) => {
      res.json(posts);
    })
    .catch(next);
};

module.exports.listMyPosts = (req, res, next) => {
  const userId = req.currentUserId;
  PostPlant.find({ user: userId })
    .then((posts) => {
      res.json(posts);
    })
    .catch(next);
};

//---Detalle del post---//
module.exports.detailPost = (req, res, next) => {
  const { id } = req.params;
  PostPlant.findById(id)
    .then((post) => {
      res.json(post);
    })
    .catch(next);
};

//---Eliminar post---//
module.exports.delete = (req, res, next) => {
  const { id } = req.params;
  PostPlant.findByIdAndDelete(id)
    .then(() => {})
    .catch(next);
};

//---Editar post---//
module.exports.edit = (req, res, next) => {
  const user = req.params.id;
  const updates = {
    name: req.body.name,
    image: req.body.image,
    state: req.body.state,
  };
  if (req.files) {
    updates.image = req.files.map((file) => file.path);
  }
  PostPlant.findById(user)
    .then((post) => {
      if (!post) {
        res.status(StatusCodes.NOT_FOUND).send("Post no encontrado");
      } else if (post.user != req.currentUserId) {
        res.status(StatusCodes.UNAUTHORIZED).send("No autorizado para editar");
      } else {
        PostPlant.findByIdAndUpdate(user, updates)
          .then(() => {
            res.send("Post actualizado");
          })
          .catch(next);
      }
    })
    .catch(next);
};
