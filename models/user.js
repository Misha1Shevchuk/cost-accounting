const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String
});

module.exports = mongoose.model("User", userSchema);
