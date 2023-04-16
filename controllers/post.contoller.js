const { StatusCodes } = require("http-status-codes");
const PostPlant = require("../models/PostPlant.model");
const User = require("../models/User.model");

//---Crear post--//

module.exports.create = (req, res, next) => {
  const { name, description, comments, state } = req.body;
  let images = [];

  if (req.files) {
    images = req.files.map((file) => {
      return {
        url: file.path,
        date: new Date()}
    });
  }

  User.findById(req.currentUserId)
    .then((user) => {
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send("User no encontrado");
      }
      return PostPlant.create({
        name,
        image: images,
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
    .populate('comments')
    .then((posts) => {
      console.log(posts[0]);
      res.json(posts);
    })
    .catch(next);
};

module.exports.listMyPosts = (req, res, next) => {
  const userId = req.currentUserId;
  PostPlant.find({ user: userId })
    .populate("user")
    .populate('comments')
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
  const { postId } = req.params;
  PostPlant.findByIdAndDelete(postId)
    .then(() => res.status(201).send("Post eliminado correctamente"))
    .catch((err) => console.log(err));
};

//---Editar post---//
module.exports.edit = (req, res, next) => {
  const { postId } = req.params;
  const updates = {
    name: req.body.name,
    image: JSON.parse(req.body.image).map(singleImage => ({ ...singleImage, date: new Date(singleImage.date) })),
    description: req.body.description,
  };
  if (req.files) {
    req.files.forEach((file) => {
      updates.image.push({
        url: file.path,
        date: new Date(),
      });
    });
  }

  PostPlant.findByIdAndUpdate(postId, updates, { new: true })
    .populate('comments')
    .then((post) => {
      console.log("el Post: ", post);
      if (!post) {
        res.status(StatusCodes.NOT_FOUND).send("Post no encontrado");
      } else {
        res.send(post);
      }
    })
    .catch(next);
};
