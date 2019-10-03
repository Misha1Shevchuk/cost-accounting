const State = require("../models/state");

const addState = async sender_psid => {
  const state = new State({
    _id: sender_psid,
    category: null,
    amount: null,
    description: null
  });
  await state
    .save()
    .then(data => data)
    .catch(err => console.log(err));
};

const getState = async sender_psid => {
  try {
    let state = await State.findById(sender_psid);
    return state;
  } catch (err) {
    console.log(err);
  }
};

const updateState = async (sender_psid, param) => {
  try {
    let state = await State.findById(sender_psid);
    if (!state) throw new Error("Not found state!");
    await State.updateOne({ _id: sender_psid }, param);
  } catch (err) {
    throw err;
  }
};

const clearState = async sender_psid => {
  try {
    await State.findByIdAndDelete(sender_psid);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addState, updateState, getState, clearState };
