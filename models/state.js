const mongoose = require("mongoose");

const stateSchema = mongoose.Schema({
  category: String,
  amount: Number,
  description: String,
  userId: String
});

module.exports = mongoose.model("State", stateSchema);
