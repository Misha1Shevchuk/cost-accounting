const Cost = require("../models/costs");

// Get history costs for current week
const getHistory = async sender_psid => {
  let costs = await Cost.find({ userId: sender_psid }).sort({ date: -1 });
  if (!costs) throw new Error("Not found costs!");
  return costs;
};

const getHistoryWithDate = async (sender_psid, dayDate) => {
  let nextDay = new Date(dayDate);
  nextDay.setDate(nextDay.getDate() + 1);
  let costs = await Cost.find({
    $and: [{ userId: sender_psid }, { date: { $gte: dayDate, $lt: nextDay } }]
  }).sort({ date: -1 });
  if (!costs) throw new Error("Not found costs!");
  return costs;
};

module.exports = { getHistory, getHistoryWithDate };
