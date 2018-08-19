const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const jwt = require("jsonwebtoken");

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

//modify JSON return only neccessary information
UserSchema.methods.toJSON = function(){
  let user = this;
  let userObject = user.toObject(); //mongoose user variable and limiting properties avaialble
  //only returns _id and email
  return (({ _id, email }) => ({ _id, email }))(userObject);

};

//instance methods
UserSchema.methods.generateAuthToken = function(){
  let user = this;
  let access = "auth";
  let token = jwt.sign({_id: user._id.toHexString(), access}, "abc123").toString();

  //Issues using .push() depending on mongo version
  //will change to spread operator or other solution later
  user.tokens = user.tokens.concat([{access,token}]);
  return user.save()
    .then(() => {
      return token;
    });
};

//Model methods
UserSchema.statics.findByToken = function(token){
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, "abc123")
  } catch(error){
    return Promise.reject();
  }

  return User.findOne({
    "_id": decoded._id,
    "tokens.token": token,
    "tokens.access": "auth",
  });

};

//Create model. First argument is singlular name for collection.
const User = mongoose.model("user", UserSchema);

module.exports = { User };
