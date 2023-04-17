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
      const newPost = PostPlant.create({
        name,
        image: images,
        user,
        description,
        comments,
        state,
      });
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
  .populate('user')
  .populate('comments')
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
  console.log('UPDATE BODY', req.body)
  const updates = {
    ...(req.body.name !== undefined) && {name: req.body.name},
   ...(req.body.image !== undefined) &&{image: JSON.parse(req.body.image).map(singleImage => ({ ...singleImage, date: new Date(singleImage.date) }))},
    ...(req.body.description !== undefined) &&{description: req.body.description},
    ...(req.body.comments !== undefined) && {comments: req.body.comments} 
  };
  if (req.files) {
    req.files.forEach((file) => {
      updates.image.push({
        url: file.path,
        date: new Date(),
      });
    });
  }
  console.log('POST TO UPDATE', updates)
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
