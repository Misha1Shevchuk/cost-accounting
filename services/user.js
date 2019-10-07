const User = require("../models/user");

const addNewUser = (sender_psid, userData) => {
  const user = new User({
    userId: sender_psid,
    firstName: userData.first_name,
    lastName: userData.last_name
  });
  console.log("added");

  user.save().catch(err => console.log(err));
};

const getUser = async sender_psid => {
  let user = await User.find({ userId: sender_psid });
  if (!user) throw new Error("Not found costs!");
  return user[0];
};

module.exports = { addNewUser, getUser };
