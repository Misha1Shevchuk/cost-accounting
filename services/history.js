const Cost = require("../models/costs");

// Get history costs for current week
const getHistory = async senderPsid => {
  let costs = await Cost.find({ userId: senderPsid }).sort({ date: -1 });
  if (!costs) throw new Error("Not found costs!");
  return costs;
};

const getHistoryWithDate = async (senderPsid, dayDate) => {
  let nextDay = new Date(dayDate);
  nextDay.setDate(nextDay.getDate() + 1);
  let costs = await Cost.find({
    $and: [{ userId: senderPsid }, { date: { $gte: dayDate, $lt: nextDay } }]
  }).sort({ date: -1 });
  if (!costs) throw new Error("Not found costs!");
  return costs;
};

module.exports = { getHistory, getHistoryWithDate };
