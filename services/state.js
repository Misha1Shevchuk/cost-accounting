const State = require("../models/state");
const userData = require("./user");

const add = async senderPsid => {
  const user = await userData.getUser(senderPsid);
  const state = new State({ user: user });
  state.save().catch(err => {
    throw err;
  });
};

const get = async senderPsid => {
  const userObjectId = (await userData.getUser(senderPsid))._id;
  try {
    const state = await State.findOne({ user: userObjectId });
    return state;
  } catch (err) {
    console.error(err);
  }
};

const update = async (senderPsid, param) => {
  const userObjectId = (await userData.getUser(senderPsid))._id;
  let state = await State.updateOne({ user: userObjectId }, param);
  if (!state) throw new Error("Not found state!");
  return state[0];
};

const clear = async senderPsid => {
  const userObjectId = (await userData.getUser(senderPsid))._id;
  try {
    return await State.findOneAndDelete({ user: userObjectId });
  } catch (err) {
    throw err;
  }
};

module.exports = { add, update, get, clear };
