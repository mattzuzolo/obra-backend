const mongoose = require("mongoose");

//Configure native promises
mongoose.Promise = global.Promise;

//Connect database to node.
//Configured to default to Heroku. Or run locally.
//NOTE: Heroku MONGODB_URI is not currently configured
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/obra")

//NOTE: ^^ second param above prevents depreacation error in terminal
//{ useNewUrlParser: true }
//(node:8682) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.

module.exports = { mongoose };
