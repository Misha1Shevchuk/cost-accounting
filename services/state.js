const State = require("../models/state");

const add = async sender_psid => {
  const state = new State({
    userId: sender_psid,
    category: null,
    amount: null,
    description: null
  });
  await state.save().catch(err => {
    throw err;
  });
};

const get = async sender_psid => {
  const state = await State.find({ userId: sender_psid });
  if (!state) throw new Error("Not found costs!");
  return state[0];
};

const update = async (sender_psid, param) => {
  let state = await State.updateOne({ userId: sender_psid }, param);
  if (!state) throw new Error("Not found state!");
  return state[0];
};

const clear = async sender_psid => {
  try {
    return await State.findOneAndDelete({ userId: sender_psid });
  } catch (err) {
    throw err;
  }
};

module.exports = { add, update, get, clear };
