
//require external libraries
let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors")
let { ObjectID } = require("mongodb");

//require local imports
let { mongoose } = require("./db/mongoose");
let { User } = require("./models/user");
let { Annotation } = require("./models/annotation");
let { Artwork } = require("./models/artwork");

//Save express to app
let app = express();

//Assign port. Default to Heroku config or run 4000 locally
const PORT = process.env.PORT || 4000;

//configure middleware:
app.use(bodyParser.json());
app.use(cors())


//Configure routes here:
app.post("/users", (request, response) => {

  let user = new User({
    username: request.body.username,
    password: request.body.password,
  })

  user.save().then((doc) => {
    response.send(doc);
  }, (error) => {
    response.status(400).send(error);
  });
});

//GET Users
app.get("/users", (request, response) => {
  User.find({}).then((users) => {
    response.send({users});
  }, (error) => {
    response.status(400).send(error);
  });
})



//Listen on the chosen port
app.listen(PORT, () => {
  console.log(`Started on port ${PORT}.`);
})

module.exports = { app };
