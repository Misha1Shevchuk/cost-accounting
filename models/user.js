const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: String,
  first_name: String,
  last_name: String
});

module.exports = mongoose.model("User", userSchema);
