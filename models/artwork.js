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

ArtworkSchema.statics.findOneOrCreate = function findOneOrCreate(externalApiObject, callback) {

    this.findOne(externalApiObject.id, (error, result) => {
        return result ? callback(error, result) : this.create(externalApiObject, (error, result) => { return callback(error, result) })
    })
}

const Artwork = mongoose.model("artwork", ArtworkSchema);

module.exports = { Artwork };
