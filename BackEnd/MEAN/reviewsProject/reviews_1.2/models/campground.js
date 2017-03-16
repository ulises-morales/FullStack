// require mongoose
let mongoose = require("mongoose");

// SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});

// compile the model
module.exports = mongoose.model("Campground", campgroundSchema);
