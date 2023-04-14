const mongoose = require("mongoose");
const REQUIRED_FIELD = require("../config/errorMessages");

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, REQUIRED_FIELD],
      default: null,
    },

    image: [
      {
        url: {
          type: String,
          required: [true, REQUIRED_FIELD],
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
    },
    comments: {
      type: String,
    },
    state: {
      type: String,
      enum: ["Insta", "Ayuda", "Solucionado", "Esqueje"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtual: true,
    },
  }
);

postSchema.virtual("saves", {
  ref: "Save",
  foreignField: "post",
  localField: "_id",
  justOne: false,
});

postSchema.virtual("likes", {
  ref: "Like",
  foreignField: "post",
  localField: "_id",
  justOne: false,
});

const PostPlant = mongoose.model("PostPlant", postSchema);
module.exports = PostPlant;
