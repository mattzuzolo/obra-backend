const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator")

//establish schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email!!!`,
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  }]
});

//Create model. First argument is singlular name for collection.
const User = mongoose.model("user", UserSchema);

module.exports = { User };
