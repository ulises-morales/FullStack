let mongoose = require("mongoose");

// SCHEMA SETUP
let commentSchema = new mongoose.Schema({
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.objectID,
      ref: "User",
    },
    username: String,
  }
});

module.exports = mongoose.model("Comment", commentSchema);
