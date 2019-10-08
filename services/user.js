const User = require("../models/user");

const addNewUser = (senderPsid, userData) => {
  const user = new User({
    userId: senderPsid,
    firstName: userData.first_name,
    lastName: userData.last_name
  });
  user.save().catch(err => console.error(err));
};

const getUser = async senderPsid => {
  let user = await User.findOne({ userId: senderPsid });
  if (!user) throw new Error("Not found user");
  return user;
};

module.exports = { addNewUser, getUser };
