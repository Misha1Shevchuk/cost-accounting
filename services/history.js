const Cost = require("../models/costs");
const userData = require("./user");

// Get history costs for current week
const getHistory = async senderPsid => {
  const userId = (await userData.getUser(senderPsid))._id;
  let costs = await Cost.find({ user: userId }).sort({ date: -1 });
  if (!costs) throw new Error("Not found costs!");
  return costs;
};

const getHistoryWithDate = async (senderPsid, dayDate) => {
  const userId = (await userData.getUser(senderPsid))._id;
  let nextDay = new Date(dayDate);
  nextDay.setDate(nextDay.getDate() + 1);
  let costs = await Cost.find({
    $and: [{ user: userId }, { date: { $gte: dayDate, $lt: nextDay } }]
  }).sort({ date: -1 });
  if (!costs) throw new Error("Not found costs!");
  return costs;
};

module.exports = { getHistory, getHistoryWithDate };
