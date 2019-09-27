const User = require("../models/user");
const Cost = require("../models/costs");

const addNewUser = (sender_psid, userName) => {
  const user = new User({
    _id: sender_psid,
    name: userName.first_name
  });

  user
    .save()
    .then(data => console.log(data))
    .catch(err => console.log(err));
};

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

module.exports = { addNewUser, addNewCost };