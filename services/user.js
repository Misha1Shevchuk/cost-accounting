const User = require("../models/user");

const addNewUser = (sender_psid, userData) => {
  const user = new User({
    _id: sender_psid,
    first_name: userData.first_name,
    last_name: userData.last_name
  });

  user
    .save()
    .then(data => data)
    .catch(err => console.log(err));
};

const getUser = async sender_psid => {
  try {
    let user = await User.findById(sender_psid);
    return user;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addNewUser, getUser };
