const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Require other models to access collections
const UserSchema = require("./user");
const ArtworkSchema = require("./artwork");

//establish schema
const AnnotationSchema = new Schema({
  headline: String,
  content: String,
  source: String,
  xCoord: Number,
  yCoord: Number,
  user: [{type: Schema.Types.ObjectId, ref: 'user'}], //must reference entire collection as listed in respective schema
  artwork: [{type: Schema.Types.ObjectId, ref: 'artwork'}],
});




//Create model. First argument is singlular name for collection.
const Annotation = mongoose.model("annotation", AnnotationSchema);

module.exports = { Annotation };
