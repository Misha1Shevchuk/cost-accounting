const State = require("../models/state");

const add = async sender_psid => {
  const state = new State({
    _id: sender_psid,
    category: null,
    amount: null,
    description: null
  });
  await state
    .save()
    .then(data => data)
    .catch(err => {
      throw err;
    });
};

const get = async sender_psid => {
  try {
    return await State.findById(sender_psid);
  } catch (err) {
    throw err;
  }
};

const update = async (sender_psid, param) => {
  try {
    let state = await State.findById(sender_psid);
    if (!state) throw new Error("Not found state!");
    return await State.updateOne({ _id: sender_psid }, param);
  } catch (err) {
    throw err;
  }
};

const clear = async sender_psid => {
  try {
    return await State.findByIdAndDelete(sender_psid);
  } catch (err) {
    throw err;
  }
};

module.exports = { add, update, get, clear };
