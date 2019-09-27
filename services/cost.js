const Cost = require("../models/costs");

const addNewCost = (sender_psid, details) => {
  const cost = new Cost({
    amount: details.amount,
    description: details.description,
    date: details.date,
    category: details.category,
    userId: sender_psid
  });

  cost
    .save()
    .then(data => console.log(data))
    .catch(err => console.log(err));
};

module.exports = { addNewCost };
