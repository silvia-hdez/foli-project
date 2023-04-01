const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { REQUIRED_FIELD, INVALID_EMAIL, INVALID_LENGTH } = require('../config/errorMessages');

const ROUNDS = 10;

const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  //--- Montar un schema de mongoose ---//


const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    lastName: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    email: {
      type: String,
      required: [true, REQUIRED_FIELD],
      match: [EMAIL_PATTERN, INVALID_EMAIL],
      trim: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: [true, REQUIRED_FIELD],
      minlength: [8, INVALID_LENGTH]
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => { // Sirve para cambiar el output de los endpoints cuando hago res.json
        delete ret.__v;
        delete ret._id;
        delete ret.password;
      }
    }
  }
)


//---Se hashea la contraseña antes de que se guarde en la base de datos ---//

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, ROUNDS)
      .then(hash => {
        this.password = hash  //El nuevo valor de la contraseña es el hash resultante (contraseña que se introduce combinada con el número de rondas de cifrado)
        next()
      })
      .catch(next)
  } else {
    next()
  }
})

//--- Comparar la contraseña introducida, con la almacenada en la base de datos ---//

UserSchema.methods.checkPassword = function(passwordToCompare) {
  return bcrypt.compare(passwordToCompare, this.password);
}

//--- Crear modelo User y exportarlo ---//

const User = mongoose.model('User', UserSchema);

module.exports = User;