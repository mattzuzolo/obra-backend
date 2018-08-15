const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//establish schema
const UserSchema = new Schema({
  username: String,
  password: String,
});

//Create model. First argument is singlular name for collection.
const User = mongoose.model("user", UserSchema);

module.exports = { User };
