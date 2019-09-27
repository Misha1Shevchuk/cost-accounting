const User = require("../models/user");

const addNewUser = (sender_psid, userData) => {
  const user = new User({
    _id: sender_psid,
    first_name: userData.first_name,
    last_name: userData.last_name
  });

  user
    .save()
    .then(data => console.log(data))
    .catch(err => console.log(err));
};

const checkUser = async sender_psid => {
  try {
    let users = await User.findById(sender_psid);
    return users;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addNewUser, checkUser };
