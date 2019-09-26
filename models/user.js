const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: String,
  name: String
});

module.exports = mongoose.model("User", userSchema);
