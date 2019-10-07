const Cost = require("../models/costs");

// Add new cost to db
const addNewCost = (sender_psid, cost_dedails) => {
  const cost = new Cost({
    amount: cost_dedails.amount,
    description: cost_dedails.description,
    date: new Date(),
    category: cost_dedails.category,
    userId: sender_psid
  });

  cost.save().catch(err => console.log(err));
};

const deleteCost = async idCost => await Cost.findByIdAndDelete(idCost);

// Get statistic
const getStatistic = (sender_psid, periodOfTime) => {
  let costs = Cost.aggregate([
    {
      $match: {
        $and: [{ userId: sender_psid }, { date: { $gte: periodOfTime } }]
      }
    },
    { $group: { _id: "$category", sum: { $sum: "$amount" } } }
  ]);
  if (!costs) throw new Error("Not found costs!");
  return costs;
};

module.exports = {
  addNewCost,
  getStatistic,
  deleteCost
};
