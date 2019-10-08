const expense = require("../responses/expense");
const income = require("../responses/income");
const state = require("../services/state");

const enterAmount = async receivedMessage => {
  let response;
  let userState = await state.get(senderPsid);
  if (!isNaN(Number(receivedMessage)) && Number(receivedMessage) > 0) {
    userState.category !== "Income"
      ? (response = expense.enterDescription())
      : (response = income.enterDescription());

    state.update(senderPsid, { amount: Number(receivedMessage) });
  } else {
    userState.category !== "Income"
      ? (response = expense.enterAmount())
      : (response = income.enterAmount());
  }
  return response;
};

const enterDescription = async receivedMessage => {
  let response;
  let userState = await state.get(senderPsid);
  userState.category !== "Income"
    ? (response = expense.saveExpense())
    : (response = income.saveIncome());
  await state.update(senderPsid, { description: receivedMessage });
  return response;
};

const textWhenSaveErr = () => {
  let response;
  userState.category !== "Income"
    ? (response = expense.saveExpense())
    : (response = income.saveIncome());
  return response;
};

const textWhenSelectCategoryErr = () => expense.selectCategory();

module.exports = {
  enterAmount,
  enterDescription,
  textWhenSaveErr,
  textWhenSelectCategoryErr
};
