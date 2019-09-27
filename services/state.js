const State = require("../models/state");

const addState = sender_psid => {
  const state = new State({
    category: "",
    amount: null,
    description: "",
    userId: sender_psid
  });

  user
    .save()
    .then(data => console.log(data))
    .catch(err => console.log(err));
};

const updateState = sender_psid => {
  try {
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addNewUser, checkUser, updateUserState };
