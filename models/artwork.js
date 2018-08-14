const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const findOrCreate = require('mongoose-find-or-create')

//establish schema
const ArtworkSchema = new Schema({
  title: String,
  artist: String,
  medium: String,
  century: String,
  culture: String,
  url: String,
  imageUrl: String,
  apiId: {
    type: String,
    unique: true
  }
});

const Artwork = mongoose.model("artwork", ArtworkSchema);

module.exports = { Artwork };
