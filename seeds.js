const fetch = require("node-fetch");

const artworkUrl = "https://agile-anchorage-40481.herokuapp.com/artwork"

const seedArtwork = [{
    title: "The Farm",
    artist: "Joan Miró",
    medium: "Oil on cavnas",
    century: "20th Century",
    culture: "Spanish",
    url: "https://www.nga.gov/collection/art-object-page.69660.html",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/TheFarmMiro21to22.jpg/300px-TheFarmMiro21to22.jpg",
    apiId: "134",
  },{
    title: "The Persistence of Memory",
    artist: "Salvador Dalí",
    medium: "Oil on canvas",
    century: "20th Century",
    culture: "Spanish",
    url: "https://www.moma.org/learn/moma_learning/1168-2",
    imageUrl: "https://www.moma.org/wp/moma_learning/wp-content/uploads/2012/07/dali-469x340.jpg",
    apiId: "267",
  },{
    title: "Wanderer Above the Sea of Fog",
    artist: "Caspar David Friedrich",
    medium: "Oil on canvas",
    century: "19th Century",
    culture: "German",
    url: "https://en.wikipedia.org/wiki/Wanderer_above_the_Sea_of_Fog",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
    apiId: "315",
  },{
    title: "Haystacks (Effect of Snow and Sun)",
    artist: "Claude Monet",
    medium: "Oil on canvas",
    century: "19th Cenutry",
    culture: "French",
    url: "https://www.metmuseum.org/art/collection/search/437122",
    imageUrl: "https://images.metmuseum.org/CRDImages/ep/web-large/DT1035.jpg",
    apiId: "487",
  }];

let artWorkInstances = [];
let userInstances = [];

function postArtwork(artworkUrl,obj) {

  let body = {
    title: obj.title,
    artist: obj.artist,
    medium: obj.medium,
    century: obj.century,
    culture: obj.culture,
    url: obj.url,
    imageUrl: obj.imageUrl,
    apiId: obj.apiId,
  }

 const postConfig = {
   Accept: "application/json",
   method: "POST",
   headers: {
     "Content-type": "application/json"
   },
   body: JSON.stringify(body)
 };
 return fetch(artworkUrl, postConfig)
}


for (let i = 0; i < seedArtwork.length; i++){
  postArtwork(artworkUrl, seedArtwork[i])
    .then(res => res.json())
    .then(json => console.log(json));
}

////////////

const usersUrl = "https://agile-anchorage-40481.herokuapp.com/users"
const seedUser = [{
    username: "Matt",
    password: "the best password ever",
  },{
    username: "Kayla",
    password: "password"
  },{
    username: "David",
    password: "DavidT"
  },{
    username: "Jordan",
    password: "12345"
  }];

function postUser(usersUrl,obj) {

  let body = {
    username: obj.username,
    password: obj.password,
  }

 const postConfig = {
   Accept: "application/json",
   method: "POST",
   headers: {
     "Content-type": "application/json"
   },
   body: JSON.stringify(body)
 };
 return fetch(usersUrl, postConfig)
}

for (let i = 0; i < seedUser.length; i++){
  postUser(usersUrl, seedUser[i])
    .then(res => res.json())
    .then(data => seedAnnotation(data));
}

////////////


const seedAnnotation = [{
    headline: "Pedestrian at Best.",
    body: "I could totally paint this. Why is it in a museum?",
    source: "https://www.yahoo.com",
    user: seedUser[0],
    artwork: seedArtwork[0],
  },{
    headline: "Pretty meh",
    body: "It could be better. I prefer Banksy. That's real art.",
    source: "https://en.wikipedia.org/wiki/Banksy",
    user: seedUser[0],
    artwork: seedArtwork[1],
  },{
    headline: "lame.",
    body: "I HAVE THE BEST SOURCES.",
    source: "https://www.wikipedia.org/",
    user: seedUser[2],
    artwork: seedArtwork[2],
  },{
    headline: "One of his best works",
    body: "Love it.",
    source: "https://nodejs.org/en/",
    user: seedUser[3],
    artwork: seedArtwork[0],
  }];

setTimeout(function () {



}, 2500)
