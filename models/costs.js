const mongoose = require("mongoose");

const costSchema = mongoose.Schema({
  amount: Number,
  description: String,
  date: Date,
  category: String,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Cost", costSchema);
