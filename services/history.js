const Cost = require("../models/costs");
const getNumberWeek = require("../helpers/date");

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

const getHistoryWeek = async sender_psid => {
  let currentDate = new Date();
  let numberCurrentWeek = getNumberWeek(currentDate);
  let costsForWeek = [];

  try {
    let costs = await Cost.find({ userId: sender_psid });
    if (!costs) throw new Error("Not found costs!");
    costs.map(cost => {
      if (getNumberWeek(cost.date) === numberCurrentWeek) {
        costsForWeek.push(cost);
      }
    });
    return costsForWeek;
  } catch (err) {
    throw err;
  }
};

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
