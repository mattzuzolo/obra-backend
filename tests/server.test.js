
//require external libraries
const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

//require local imports
const { app } = require("./../server");
const { User } = require("../models/user");
const { Annotation } = require("../models/annotation");
const { Artwork } = require("../models/artwork");

const seedUser = [{
    _id: new ObjectID(),
    name: "Matt",
    password: "the best password ever",
  },{
    _id: new ObjectID(),
    name: "Kayla",
    password: "password"
  },{
    _id: new ObjectID(),
    name: "David",
    password: "DavidT"
  },{
    _id: new ObjectID(),
    name: "Jordan",
    password: "12345"
  }];

const seedArtwork = [{
    _id: new ObjectID(),
    title: "The Persistence of Memory",
    artist: "Salvador Dalí",
    medium: "Oil on canvas",
    century: "20th Century",
    culture: "Spanish",
    url: "https://www.moma.org/learn/moma_learning/1168-2",
    imageUrl: "https://www.moma.org/wp/moma_learning/wp-content/uploads/2012/07/dali-469x340.jpg",
    apiId: "134",
  },{
    _id: new ObjectID(),
    title: "The Farm",
    artist: "Joan Miró",
    medium: "Oil on cavnas",
    century: "20th Century",
    culture: "Spanish",
    url: "https://www.nga.gov/collection/art-object-page.69660.html",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/TheFarmMiro21to22.jpg/300px-TheFarmMiro21to22.jpg",
    apiId: "254",
  },{
    _id: new ObjectID(),
    title: "Wanderer Above the Sea of Fog",
    artist: "Caspar David Friedrich",
    medium: "Oil on canvas",
    century: "19th Century",
    culture: "German",
    url: "https://en.wikipedia.org/wiki/Wanderer_above_the_Sea_of_Fog",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
    apiId: "315",
  },{
    _id: new ObjectID(),
    title: "Haystacks (Effect of Snow and Sun)",
    artist: "Claude Monet",
    medium: "Oil on canvas",
    century: "19th Cenutry",
    culture: "French",
    url: "https://www.metmuseum.org/art/collection/search/437122",
    imageUrl: "https://images.metmuseum.org/CRDImages/ep/web-large/DT1035.jpg",
    apiId: "487",
  }];

const seedAnnotation = [{
    _id: new ObjectID(),
    headline: "Pedestrian at Best.",
    body: "I could totally paint this. Why is it in a museum?",
    source: "https://www.yahoo.com",
    user: seedUser[0],
    artwork: seedArtwork[0],
  },{
    _id: new ObjectID(),
    headline: "Pretty meh",
    body: "It could be better. I prefer Banksy. That's real art.",
    source: "source",
    user: seedUser[0],
    artwork: seedArtwork[1],
  },{
    _id: new ObjectID(),
    headline: "cool.",
    body: "jk lame.",
    source: "source",
    user: seedUser[2],
    artwork: seedArtwork[2],
  },{
    _id: new ObjectID(),
    headline: "One of his best works",
    body: "Love it.",
    source: "source",
    user: seedUser[3],
    artwork: seedArtwork[0],
  }];

console.log(seedAnnotation)

describe("Seeding Users", () => {

  it("should create a new instance of person with a name and password", function() {
    expect(seedUser[0].name).toBe("Matt");
    expect(seedUser[2].password).toBe("DavidT");
  });

});

describe("Seeding Artwork", () => {

  it("Should create a new instace of artwork with title, artist, url, imageUrl and apiId", function() {
    expect(seedArtwork[1].title).toBe("The Farm");
    expect(seedArtwork[1].artist).toBe("Joan Miró");
    expect(seedArtwork[1].medium).toBe("Oil on cavnas");
    expect(seedArtwork[1].century).toBe("20th Century");
    expect(seedArtwork[1].culture).toBe("Spanish");
    expect(seedArtwork[1].url).toBe("https://www.nga.gov/collection/art-object-page.69660.html");
    expect(seedArtwork[1].imageUrl).toBe("https://upload.wikimedia.org/wikipedia/en/thumb/3/33/TheFarmMiro21to22.jpg/300px-TheFarmMiro21to22.jpg");
    expect(seedArtwork[1].apiId).toBe("254");
  });

});

describe("Seeding Annotation", () => {

  it("Should create an annotation with a user and artwork reference", function() {
    expect(seedAnnotation[0].headline).toBe("Pedestrian at Best.");
    expect(seedAnnotation[0].user).toBe(seedUser[0]);
    expect(seedAnnotation[0].artwork).toBe(seedArtwork[0]);
  });

});
