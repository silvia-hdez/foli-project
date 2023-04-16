const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "PostPlant",
  },
  content: String
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
