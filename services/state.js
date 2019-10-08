const State = require("../models/state");

const add = async senderPsid => {
  const state = new State({
    userId: senderPsid,
    category: null,
    amount: null,
    description: null
  });
  await state.save().catch(err => {
    throw err;
  });
};

const get = async senderPsid => {
  const state = await State.findOne({ userId: senderPsid });
  if (!state) throw new Error("Not found costs!");
  return state;
};

const update = async (senderPsid, param) => {
  let state = await State.updateOne({ userId: senderPsid }, param);
  if (!state) throw new Error("Not found state!");
  return state[0];
};

const clear = async senderPsid => {
  try {
    return await State.findOneAndDelete({ userId: senderPsid });
  } catch (err) {
    throw err;
  }
};

module.exports = { add, update, get, clear };
