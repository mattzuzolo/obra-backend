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
  primaryimageurl: String,
  id: {
    type: Number,
    unique: true
  }
});

const Artwork = mongoose.model("artwork", ArtworkSchema);

module.exports = { Artwork };
