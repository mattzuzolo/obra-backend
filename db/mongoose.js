const mongoose = require("mongoose");

//Configure native promises
mongoose.Promise = global.Promise;

//Connect database
//Configured to default to Heroku. Or run locally.
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/obra", { useNewUrlParser: true });

//note: ^^ second param above prevents deprecation warning
//{ useNewUrlParser: true }
//(node:8682) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.

module.exports = { mongoose };
//
