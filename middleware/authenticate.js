let { User } = require("../models/user")

let authenticate = (request, response, next) => {
  let token = request.header("x-auth");
  // console.log("TOKEN RECEIVED FROM HEADER", token)

  User.findByToken(token).then((user) => {
    if (!user){
      // console.log("USER DOES NOT EXIST IN AUTHENTICATE")
      return Promise.reject(); //send to catch for 401
    }
    request.user = user;
    request.token = token;
    next();
  }).catch((error) => {
    // console.log("find by token catch")
    response.status(401).send();
    next();
  });
};

module.exports = { authenticate };
