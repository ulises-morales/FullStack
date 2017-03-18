let mongoose = require("mongoose");

// SCHEMA SETUP
let commentSchema = new mongoose.Schema({
  text: String,
  author: String,
});

module.exports = mongoose.model("Comment", commentSchema);
