// const mongoose = require("mongoose");
const User = require("../models/user");

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

module.exports = { addNewUser };
