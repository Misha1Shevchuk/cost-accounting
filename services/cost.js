const Cost = require("../models/costs");
const userData = require("./user");

// Add new cost to db
const addNewCost = async (senderPsid, cost_dedails) => {
  const user = await userData.getUser(senderPsid);
  const cost = new Cost({
    amount: cost_dedails.amount,
    description: cost_dedails.description,
    date: new Date(),
    category: cost_dedails.category,
    user: user
  });

  cost.save().catch(err => console.err(err));
};

const deleteCost = async idCost => await Cost.findByIdAndDelete(idCost);

// Get statistic
const getStatistic = async (senderPsid, periodOfTime) => {
  const userId = (await userData.getUser(senderPsid))._id;
  const costs = Cost.aggregate([
    {
      $match: {
        $and: [{ user: userId }, { date: { $gte: periodOfTime } }]
      }
    },
    { $group: { _id: "$category", sum: { $sum: "$amount" } } }
  ]);
  return costs;
};

module.exports = {
  addNewCost,
  getStatistic,
  deleteCost
};
