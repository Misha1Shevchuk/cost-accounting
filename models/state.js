const mongoose = require("mongoose");

const stateSchema = mongoose.Schema({
  _id: String,
  category: String,
  amount: Number,
  description: String,
  userId: String
});

module.exports = mongoose.model("State", stateSchema);
