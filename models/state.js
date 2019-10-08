const mongoose = require("mongoose");

const stateSchema = mongoose.Schema({
  category: {
    type: String,
    default: null
  },
  amount: {
    type: Number,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("State", stateSchema);
