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
    .then(data => console.log(data))
    .catch(err => console.log(err));
};

module.exports = { addNewCost };
