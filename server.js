require('./config/config');

//require external libraries
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const { ObjectID } = require("mongodb");

//require local imports
let { mongoose } = require("./db/mongoose");
let { User } = require("./models/user");
let { Annotation } = require("./models/annotation");
let { Artwork } = require("./models/artwork");
let { authenticate } = require("./middleware/authenticate");

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

app.get("/current", (request, response) => {
  let token = request.get("x-auth")
  //
  // if (!ObjectID.isValid(id)){
  //   return response.status(404).send();
  // }

  User.findByToken(token).then((user) => {
    if(!user){
      return response.status(404).send();
    }
    response.send({user});
  }).catch((error) => {
    // response.status(400).send();
  });
});
//POST Users
// app.post("/users", (request, response) => {
//   let user = new User({
//     username: request.body.username,
//     password: request.body.password,
//   })
//   //save to DB or deny entry
//   user.save().then((doc) => {
//     response.send(doc);
//   }, (error) => {
//     response.status(400).send(error);
//   });
// });


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

  let paramId = request.params.id;

  // if (!ObjectID.isValid(paramId)){
  //   console.log("invalid")
  //   return response.status(404).send();
  // }

  Artwork.findOne({id: paramId}).then((artwork) => {
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
    primaryimageurl: request.body.primaryimageurl,
    id: request.body.id,
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
 ////
app.get("/me/annotations", authenticate, (request, response) => {
  //use find method to access all users
  Annotation.find({
    user: request.user._id
  })
  .populate("artwork")
  .populate("user")
  .then((annotations) => {
    response.send({annotations});
  }, (error) => {
    response.status(400).send(error);
  });
});
//comment
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

//GET annotations by with artwork object
app.get("/annotations-artwork", (request, response) => {
  Annotation.find({})
    .populate("artwork")
    .then((annotation) => {
    if(!annotation){
      return response.status(404).send();
    }
    response.send({annotation});
  }).catch((error) => {
    response.status(400).send();
  });
});

//GET annotations by with artwork object
app.get("/annotations-user", (request, response) => {
  Annotation.find({})
    .populate("user")
    .then((annotation) => {
    if(!annotation){
      return response.status(404).send();
    }
    response.send({annotation});
  }).catch((error) => {
    response.status(400).send();
  });
});


//POST annotation
app.post("/annotations", authenticate, (request, response) => {
  // console.log("Request at /annotations POST: ", request.body);
  let annotation = new Annotation({
    headline: request.body.headline,
    content: request.body.content,
    source: request.body.source,
    xCoord: request.body.xCoord,
    yCoord: request.body.yCoord,
    artwork: request.body.artwork,
    user: request.body.user,
    // user: request.user._id,
  });

  // console.log("Request at /annotations POST: ", request.body);
  // console.log(request.body);

  annotation.save().then((doc) => {
    response.send(doc);
  }, (error) => {
    response.status(400).send(error);
  });
});
//
//UPDATE annotation
app.put("/annotations/:id", authenticate, (request, response) => {
  let id = request.params.id; //annotation id
  let body = request.body;


  if (!ObjectID.isValid(id)){
    return response.status(404).send();
  }

  Annotation.findOneAndUpdate({_id: id}, request.body, {new: true})
    .then((annotation) => {
      if (!annotation) {
        return response.status(404).send();
      }

      response.send({annotation})

    }).catch((error) => {
      response.send(400).send();
    })
});









//DELETE annotation
app.delete("/annotations/:id", authenticate, (request, response) => {
  let id = request.params.id;

  if (!ObjectID.isValid(id)){
    return response.status(404).send();
  }

  Annotation.findOneAndRemove({
    _id: id,
    user: request.user._id,
  }).then((annotation) => {
    if (!annotation){

      return response.status(404).send();
    }
    response.send(annotation);
  }).catch((error) => {
    response.status(400).send();
  });
});

//AUTHENTICATION STUFF HERE!!!
//POST to /Users
app.post("/users", (request, response) => {

  let body = (({ email, password }) => ({ email, password }))(request.body);

  let user = new User(body);

  user.save()
    .then(() => {

      return user.generateAuthToken();
  }).then((token) => {
    response.header("x-auth", token).send(user);

  }).catch((event) => {

    response.status(400).send(event)
  })
});


app.get("/users/me", authenticate, (request, response) => {
  response.send(request.user)
});

//Login user
app.post("/users/login", (request, response) => {
  let body = (({ email, password }) => ({ email, password }))(request.body);

  User.findByCredentials(body.email, body.password)
    .then((user) => {
      return user.generateAuthToken().then((token) => {
        let userWithToken = Object.assign({}, user, {"token": token})
        // console.log("ABOUT TO SEND userWithToken", userWithToken)
        // response.header("x-auth", token).send(user);
        response.send(userWithToken)
      });
    }).catch((error) => {
      response.status(400).send();
    });
})

//Logout user
app.delete("/users/me/token", authenticate, (request, response) => {
  request.user.removeToken(request.token)
    .then(() => {
      response.status(200).send();
    }), () => {
      response.status(400).send();
    }
});




//Listen on the chosen port
app.listen(PORT, () => {
  console.log(`Started on port ${PORT}.`);
})

module.exports = { app };
