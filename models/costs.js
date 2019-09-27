const mongoose = require("mongoose");

const costSchema = mongoose.Schema({
  amount: Number,
  description: String,
  date: Date,
  category: String,
  userId: String
});

module.exports = mongoose.model("Cost", costSchema);
