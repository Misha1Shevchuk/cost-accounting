const Cost = require("../models/costs");

// Get history costs for current month
const getHistoryMonth = async sender_psid => {
  var now = new Date();
  var currentMonth = new Date(now.getFullYear(), now.getMonth());
  try {
    let costs = await Cost.find({
      userId: sender_psid,
      date: { $gte: currentMonth }
    });
    if (!costs) throw new Error("Not found costs!");
    return costs;
  } catch (err) {
    throw err;
  }
};

// Get history costs for current week
const getHistoryWeek = async sender_psid => {
  var now = new Date();
  let numberDay = now.getDay();
  var dateOfStartWeek = new Date();
  dateOfStartWeek.setDate(now.getDate() - numberDay + 1);

  try {
    let costs = await Cost.find({
      $and: [{ userId: sender_psid }, { date: { $gte: dateOfStartWeek } }]
    });
    if (!costs) throw new Error("Not found costs!");

    return costs;
  } catch (err) {
    throw err;
  }
};

// Get history costs for today
const getHistoryDay = async sender_psid => {
  var now = new Date();
  var currentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  try {
    let costs = await Cost.find({
      userId: sender_psid,
      date: { $gte: currentDay }
    });
    if (!costs) throw new Error("Not found costs!");
    return costs;
  } catch (err) {
    throw err;
  }
};

module.exports = { getHistoryDay, getHistoryWeek, getHistoryMonth };
