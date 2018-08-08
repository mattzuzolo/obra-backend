
//require external libraries
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

//require local imports
const { mongoose } = require("./db/mongoose");
const { User } = require("./models/user");
const { Annotation } = require("./models/annotation");
const { Artwork } = require("./models/artwork");

//Save express to app
let app = express();

//Assign port. Default to Heroku config or run 4000 locally
const PORT = process.env.PORT || 4000;


//Configure routes here:



//Listen on the chosen port
app.listen(PORT, () => {
  console.log(`Started on port ${PORT}.`);
})

module.exports = { app };
