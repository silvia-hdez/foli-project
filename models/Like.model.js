const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "PostPlant",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtual: true,
    },
  }
);

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
