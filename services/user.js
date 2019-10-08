const User = require("../models/user");

const addNewUser = (senderPsid, userData) => {
  const user = new User({
    userId: senderPsid,
    firstName: userData.first_name,
    lastName: userData.last_name
  });
  user.save().catch(err => console.log(err));
};

const getUser = async senderPsid => {
  let user = await User.findOne({ userId: senderPsid });
  if (!user) throw new Error("Not found costs!");
  return user;
};

module.exports = { addNewUser, getUser };
