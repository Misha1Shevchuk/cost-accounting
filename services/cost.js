const Cost = require("../models/costs");

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

const getStatisticWeek = async sender_psid => {
  var now = new Date();
  let numberDay = now.getDay();
  var startWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - numberDay);
  console.log(now);
  console.log(numberDay);
  console.log(startWeek);

  try {
    let costs = await Cost.aggregate([
      {
        $match: {
          $and: [{ userId: sender_psid }, { date: { $gte: startWeek } }]
        }
      },
      { $group: { _id: "$category", sum: { $sum: "$amount" } } }
    ]);
    if (!costs) throw new Error("Not found costs!");

    return costs;
  } catch (err) {
    throw err;
  }
};

const getStatisticDay = async sender_psid => {
  var now = new Date();
  var currentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  try {
    let costs = await Cost.aggregate([
      {
        $match: {
          $and: [{ userId: sender_psid }, { date: { $gte: currentDay } }]
        }
      },
      { $group: { _id: "$category", sum: { $sum: "$amount" } } }
    ]);

    if (!costs) throw new Error("Not found costs!");
    return costs;
  } catch (err) {
    throw err;
  }
};

const getStatisticMonth = async sender_psid => {
  var now = new Date();
  var currentMonth = new Date(now.getFullYear(), now.getMonth());
  try {
    let costs = await Cost.aggregate([
      {
        $match: {
          $and: [{ userId: sender_psid }, { date: { $gte: currentMonth } }]
        }
      },
      { $group: { _id: "$category", sum: { $sum: "$amount" } } }
    ]);

    if (!costs) throw new Error("Not found costs!");
    return costs;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addNewCost,
  getStatisticWeek,
  getStatisticMonth,
  getStatisticDay
};
