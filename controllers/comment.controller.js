const { StatusCodes } = require("http-status-codes");
const Comment = require("../models/Comment.model");

//---Crear comentario---//

module.exports.create = (req, res, next) => {
  console.log("body:", req.body);
  const user = req.currentUserId;
  const { content, postId } = req.body;

  Comment.create({ content, user  , post: postId })

    .then((newComment) => {
      console.log(newComment);
      res.status(StatusCodes.CREATED).json(newComment);
    })
    .catch(next);
};

//---Eliminar comentario---//

module.exports.deleteComment = (req, res, next) => {
  const { commentId } = req.params;
  Comment.findByIdAndDelete(commentId)
    .then(() => res.status(StatusCodes.OK).json())
    .catch(next);
};

//---Editar comentarios---//

module.exports.editComment = (req, res, next) => {
  const { commentId } = req.params;
  const { content } = req.body;

  Comment.findById(commentId)
    .populate("user")
    .then((comment) => {
      if (comment.user._id.toString() === req.currentUserId) {
        return Comment.findByIdAndUpdate(commentId, { content }, { new: true })
          .then((comment) => res.status(StatusCodes.OK).json(comment))
          .catch(next);
      }
    })
    .catch(next);
};

//---Traer los comentarios---//

module.exports.getComments = (req, res, next) => {
  console.log(req.body, req.params)
  const { postId } = req.body;

  Comment.find(postId)
    .populate("user")
    .then((comments) => res.json({ data: comments }))
    .catch(next);
};
