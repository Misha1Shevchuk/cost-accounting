const Cost = require("../models/costs");
const getNumberWeek = require("../helpers/date");

const addNewCost = (sender_psid, cost_dedails) => {
  const cost = new Cost({
    amount: cost_dedails.amount,
    description: cost_dedails.description,
    date: new Date().toJSON(),
    category: cost_dedails.category,
    userId: sender_psid
  });

  cost
    .save()
    .then(data => data)
    .catch(err => console.log(err));
};

const getCosts = async sender_psid => {
  try {
    let costs = await Cost.find({ userId: sender_psid });
    if (!costs) throw new Error("Not found costs!");
    return costs;
  } catch (err) {
    throw err;
  }
};

const getCosts_week = async sender_psid => {
  let currentDate = new Date();
  let numberCurrentWeek = getNumberWeek(currentDate);
  let costsForWeek = [];

  try {
    let costs = await Cost.find({ userId: sender_psid });
    if (!costs) throw new Error("Not found costs!");
    costs.map(cost => {
      console.log(getNumberWeek(cost.date));
      if (getNumberWeek(cost.date) === numberCurrentWeek) {
        costsForWeek.push(cost);
      }
    });
    return costsForWeek;
  } catch (err) {
    throw err;
  }
};

const getCosts_today = async sender_psid => {
  var now = new Date();
  var currentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  try {
    let costs = await Cost.find({
      userId: sender_psid,
      date: { $gte: todayDate }
    });
    if (!costs) throw new Error("Not found costs!");
    return costs;
  } catch (err) {
    throw err;
  }
};

const getCosts_month = async sender_psid => {
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

module.exports = {
  addNewCost,
  getCosts,
  getCosts_week,
  getCosts_today,
  getCosts_month
};
