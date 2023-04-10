const mongoose = require("mongoose");

const saveSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "PostPlant",
    },
    plants: {
      type: mongoose.Types.ObjectId,
      ref: "Plant",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtual: true,
    },
  }
);

const Save = mongoose.model("Save", saveSchema);
module.exports = Save;
