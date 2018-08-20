let { User } = require("../models/user")

let authenticate = (request, response, next) => {
  let token = request.header("x-auth");

  User.findByToken(token).then((user) => {
    if (!user){
      return Promise.reject(); //send to catch for 401
    }
    request.user = user;
    request.token = token;
    next();
  }).catch((error) => {
    console.log("find by token catch")
    response.status(401).send();
    next();
  });
};

module.exports = { authenticate };
