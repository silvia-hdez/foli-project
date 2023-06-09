const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  REQUIRED_FIELD,
  INVALID_EMAIL,
  INVALID_LENGTH,
  INVALID_PHONE,
} = require("../config/errorMessages");

const ROUNDS = 10;

const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const PHONE_REGEX = /^\+?[0-9]{9,15}$/;

//--- Montar un schema de mongoose ---//

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    userName: {
      type: String,
      required: [true, REQUIRED_FIELD],
      unique: true,
    },
    userPhone: {
      type: String,
      required: [
        function () {
          return !this.email;
        },
        REQUIRED_FIELD,
      ],
      match: [PHONE_REGEX, INVALID_PHONE],
      minlength: [9, INVALID_LENGTH],
      trim: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg",
    },
    email: {
      type: String,
      required: [
        function () {
          return !this.phone;
        },
        REQUIRED_FIELD,
      ],
      match: [EMAIL_PATTERN, INVALID_EMAIL],
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, REQUIRED_FIELD],
      minlength: [8, INVALID_LENGTH],
    },
    following: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		followers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        // Sirve para cambiar el output de los endpoints cuando hago res.json
        delete ret.__v;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

userSchema.virtual("posts", {
  ref: "PostPlant",
  foreignField: "user",
  localField: "_id",
  justOne: false,
});

userSchema.virtual("saves", {
  ref: "Save",
  foreignField: "user",
  localField: "_id",
  justOne: false,
});

userSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "user",
  localField: "_id",
  justOne: false,
});

userSchema.virtual("likes", {
  ref: "Like",
  foreignField: "user",
  localField: "id",
  justOne: false,
});

userSchema.virtual("plants", {
  ref: "Plant",
  foreignField: "user",
  localField: "id",
  justOne: false,
});

userSchema.path("email").validate(function (value) {
  return value || this.userPhone;
});

userSchema.path("userPhone").validate(function (value) {
  return value || this.email;
});

//---Se hashea la contraseña antes de que se guarde en la base de datos ---//

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, ROUNDS)
      .then((hash) => {
        this.password = hash; //El nuevo valor de la contraseña es el hash resultante (contraseña que se introduce combinada con el número de rondas de cifrado)
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

//--- Comparar la contraseña introducida, con la almacenada en la base de datos ---//

userSchema.methods.checkPassword = function (passwordToCompare) {
  return bcrypt.compare(passwordToCompare, this.password);
};

//--- Crear modelo User y exportarlo ---//

const User = mongoose.model("User", userSchema);

module.exports = User;
