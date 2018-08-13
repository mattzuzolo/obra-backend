const { User } = require("./models/user");
const { Annotation } = require("./models/annotation");
const { Artwork } = require("./models/artwork");
const { mongoose } = require("./db/mongoose");

let userExample = new User({
  username: "seedUsername",
  password: "seedPassword",
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
    headline: "SEED HEADLINE",
    content: "SEED CONTENT",
    source: "SEED SOURCE",
    user: [userExample],
    artwork: [artworkExample],
  });
  annotationExample.save();
}).then(console.log("Success"))
  .catch("error!!")


  let userExampleTwo = new User({
    username: "seedUsername",
    password: "seedPassword",
  });

  let artworkExampleTwo = new Artwork({
    title: "Guernica",
    artist: "Pablo Picasso",
    medium: "Oil on canvas",
    century: "20th Cenutry",
    culture: "Spanish",
    url: "https://en.wikipedia.org/wiki/guernica",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg",
    apiId: 568,
  });

  Promise.all([
    userExampleTwo.save(),
    artworkExampleTwo.save(),
  ]).then(([user, artwork]) => {
    let annotationExampleTwo = new Annotation({
      headline: "SEED HEADLINE",
      content: "SEED CONTENT",
      source: "SEED SOURCE",
      user: [userExampleTwo],
      artwork: [artworkExampleTwo],
    });
    annotationExampleTwo.save();
  }).then(console.log("Success"))
    .catch("error!!")
