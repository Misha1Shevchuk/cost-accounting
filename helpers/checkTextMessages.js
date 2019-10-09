const expense = require("../responses/expense");
const income = require("../responses/income");
const INCOME = require("./incomesEnum");
const typical = require("../responses/typical");
const state = require("../services/state");

const textWhenMenuErr = senderPsid => typical.showMenu(senderPsid);

const enterAmount = async (senderPsid, receivedMessage) => {
  let response;
  let userState = await state.get(senderPsid);
  if (!isNaN(Number(receivedMessage)) && Number(receivedMessage) > 0) {
    userState.category !== INCOME
      ? (response = expense.enterDescription())
      : (response = income.enterDescription());

    state.update(senderPsid, { amount: Number(receivedMessage) });
  } else {
    userState.category !== INCOME
      ? (response = expense.enterAmount())
      : (response = income.enterAmount());
  }
  return response;
};

const enterDescription = async (senderPsid, receivedMessage) => {
  let response;
  let userState = await state.get(senderPsid);
  userState.category !== INCOME
    ? (response = expense.saveExpense())
    : (response = income.saveIncome());
  await state.update(senderPsid, { description: receivedMessage });
  return response;
};

const textWhenSaveErr = () => {
  let response;
  userState.category !== INCOME
    ? (response = expense.saveExpense())
    : (response = income.saveIncome());
  return response;
};

const textWhenSelectCategoryErr = () => expense.selectCategory();

module.exports = {
  enterAmount,
  enterDescription,
  textWhenMenuErr,
  textWhenSaveErr,
  textWhenSelectCategoryErr
};
