const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//establish schema
const ArtworkSchema = new Schema({
  title: String,
  artist: String,
  medium: String,
  century: String,
  culture: String,
  url: String,
  imageUrl: String,
  apiId: Number,
});

//Create model. First argument is singlular name for collection.
const Artwork = mongoose.model("artwork", ArtworkSchema);

module.exports = { Artwork };
