const Cost = require("../models/costs");

// Get history costs for current week
const getHistory = async sender_psid => {
  try {
    let costs = await Cost.find({ userId: sender_psid })
      .sort({ date: -1 })
      .limit(100);
    if (!costs) throw new Error("Not found costs!");
    return costs;
  } catch (err) {
    throw err;
  }
};

module.exports = { getHistory };
