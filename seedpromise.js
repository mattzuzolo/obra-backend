const { User } = require("./models/user");
const { Annotation } = require("./models/annotation");
const { Artwork } = require("./models/artwork");
const { mongoose } = require("./db/mongoose");

// User.create({
//   headline: "MattPromiseFile",
//   content: "MattPromiseFilePwd",
// }).then(response => response.json())
//   .then(console.log)
//   .catch("Error!!!")

let userExample = new User({
  username: "MattPromiseFileTHISSHOULDBEWORKING",
  password: "MattPromiseFilePwd",
});

let artworkExample = new Artwork({
  title: "Nighthawks",
  artist: "Edward Hopper",
  medium: "Oil on canvas",
  century: "20th Cenutry",
  culture: "American",
  url: "https://en.wikipedia.org/wiki/Nighthawks",
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg",
  apiId: 568,
});

Promise.all([
  userExample.save(),
  artworkExample.save(),
]).then(([user, artwork]) => {
  let annotationExample = new Annotation({
    headline: "SEED HEADLINE2",
    content: "SEED CONTENT2",
    source: "SEED SOURCE2",
    xCoord: 115.96590995788574,
    yCoord: 360.875,
    user: [userExample],
    artwork: [artworkExample],
  });
  annotationExample.save();
}).then(console.log("Success"))
  .catch("error!!")

// userExample.save()
//   .then(console.log)
//
// artworkExample.save()
//   .then(console.log);
//



// Promise.all([
//   userExample.save(),
//   artworkExample.save()
// ]).then([users,artwork]) => {
//   let annotations = [{ headline: "Matt's annotation is really great", user: users[0]}]
// }
//
// let promise1 = userExample.save();
// let promise2 = artworkExample.save();
// let promise3 = annotationExample.save();


// Promise.all([
//   User.create({
//     username: "MattPromiseFile",
//     password: "MattPromiseFilePwd",
//   }),
//   Artwork.create({
//     title: "Nighthawks",
//     artist: "Edward Hopper",
//     medium: "Oil on canvas",
//     century: "20th Cenutry",
//     culture: "American",
//     url: "https://en.wikipedia.org/wiki/Nighthawks",
//     imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg",
//     apiId: 568,
//   }),
// ]).then(response => response.json())
//   .then(console.log);
