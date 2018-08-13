
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
app.use(cors());
app.use(bodyParser.json());


//Configure routes here:

//GET Users
app.get("/users", (request, response) => {
  //use find method to access all users
  User.find({}).then((users) => {
    response.send({users});
  }, (error) => {
    response.status(400).send(error);
  });
});
//GET users by id
app.get("/users/:id", (request, response) => {
  let id = request.params.id;

  if (!ObjectID.isValid(id)){
    return response.status(404).send();
  }

  User.findById(id).then((user) => {
    if(!user){
      return response.status(404).send();
    }

    response.send({user});
  }).catch((error) => {
    response.status(400).send();
  });
});
//POST Users
app.post("/users", (request, response) => {
  let user = new User({
    username: request.body.username,
    password: request.body.password,
  })
  //save to DB or deny entry
  user.save().then((doc) => {
    response.send(doc);
  }, (error) => {
    response.status(400).send(error);
  });
});


//GET Artwork
app.get("/artwork", (request, response) => {
  //use find method to access all users
  Artwork.find({}).then((artwork) => {
    response.send({artwork});
  }, (error) => {
    response.status(400).send(error);
  });
});
//Get Artwork by id
app.get("/artwork/:id", (request, response) => {
  let id = request.params.id;

  if (!ObjectID.isValid(id)){
    return response.status(404).send();
  }

  Artwork.findById(id).then((artwork) => {
    if(!artwork){
      return response.status(404).send();
    }

    response.send({artwork});
  }).catch((error) => {
    response.status(400).send();
  });

});

//POST Artwork
app.post("/artwork", (request, response) => {
  let artwork = new Artwork({
    title: request.body.title,
    artist: request.body.artist,
    medium: request.body.medium,
    century: request.body.century,
    culture: request.body.culture,
    url: request.body.url,
    imageUrl: request.body.imageUrl,
    apiId: request.body.apiId,
  });
  //save to DB or deny entry
  artwork.save().then((doc) => {
    response.send(doc);
  }, (error) => {
    response.status(400).send(error);
  });
});


//GET annotations
app.get("/annotations", (request, response) => {
  //use find method to access all users
  Annotation.find({}).then((annotations) => {
    response.send({annotations});
  }, (error) => {
    response.status(400).send(error);
  });
});

//GET annotations by id
app.get("/annotations/:id", (request, response) => {
  let id = request.params.id;

  if (!ObjectID.isValid(id)){
    return response.status(404).send();
  }

  Annotation.findById(id).then((annotation) => {
    if(!annotation){
      return response.status(404).send();
    }
    response.send({annotation});
  }).catch((error) => {
    response.status(400).send();
  });
});

//POST annotation
app.post("/annotations", (request, response) => {
  let annotation = new Annotation({
    headline: request.body.headline,
    content: request.body.content,
    source: request.body.source,

  });

  annotation.save().then((doc) => {
    console.log("Doc has saved: ", doc)
    response.send(doc);
  }, (error) => {
    response.status(400).send(error);
  });
});

//UPDATE annotation
app.put("/annotations/:id", (request, response) => {
  let id = request.params.id;

  //only allow user to pass specified keys
  // let body = (({ headline, content, source}) => ({ headline, content, source }))(request.body);
  let body = request.body;

  if (!ObjectID.isValid(id)){
    return response.status(404).send();
  }

  Annotation.findByIdAndUpdate(id, request.body, {new: true})
    .then((annotation) => {
      if (!annotation) {
        console.log("Annotation doesn't exist")
        return response.status(404).send();
      }
      response.send({annotation})

    }).catch((error) => {
      response.send(400).send();
    })
});

//DELETE annotation
app.delete("/annotations/:id", (request, response) => {
  let id = request.params.id;

  if (!ObjectID.isValid(id)){
    return response.status(404).send();
  }

  Annotation.findByIdAndRemove(id).then((annotation) => {
    if (!annotation){
      return response.status(404).send();
    }
    response.send(annotation);
  }).catch((error) => {
    response.status(400).send();
  });
});


//Listen on the chosen port
app.listen(PORT, () => {
  console.log(`Started on port ${PORT}.`);
})

module.exports = { app };
