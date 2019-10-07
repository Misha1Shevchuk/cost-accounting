const category = require("../helpers/categoriesEnum");
const formMessage = require("../helpers/formMessages");

const selectCategory = () => {
  const text = "Select category";
  let quickReplies = [
    { title: category.TRANSPORT, payload: "<TRANSPORT>" },
    { title: category.FOOD, payload: "<FOOD>" },
    { title: category.ENTERTAINMENT, payload: "<ENTERTAINMENT>" },
    { title: category.BEAUTY_AND_HEALTH, payload: "<BEAUTY_AND_HEALTH>" },
    { title: category.CLOTHES, payload: "<CLOTHES>" },
    { title: category.UTILITES, payload: "<UTILITES>" },
    { title: category.OTHER, payload: "<OTHER>" }
  ];
  return formMessage.formQuickReplies(text, quickReplies);
};

const enterAmount = () => {
  const text = "Type or select amount:";
  let quickReplies = [
    { title: "50", payload: "<AMOUNT_50>" },
    { title: "100", payload: "<AMOUNT_100>" },
    { title: "200", payload: "<AMOUNT_200>" },
    { title: "Change category", payload: "<GO_BACK_TO_CATEGORIES>" }
  ];
  return formMessage.formQuickReplies(text, quickReplies);
};

const enterDescription = () => {
  const text = "Write description:";
  let quickReplies = [
    { title: "Skip", payload: "<SKIP_DESCRIPTION>" },
    { title: "Change amount", payload: "<GO_BACK_TO_AMOUNT>" },
    { title: "Change category", payload: "<GO_BACK_TO_CATEGORIES>" }
  ];
  return formMessage.formQuickReplies(text, quickReplies);
};

const saveExpense = () => {
  const text = "Save expense?";
  let quickReplies = [
    { title: "Save it", payload: "<SAVE_COST>" },
    { title: "Change description", payload: "<GO_BACK_TO_DESCRIPTION>" },
    { title: "Change amount", payload: "<GO_BACK_TO_AMOUNT>" },
    { title: "Change category", payload: "<GO_BACK_TO_CATEGORIES>" }
  ];
  return formMessage.formQuickReplies(text, quickReplies);
};

module.exports = {
  saveExpense,
  enterAmount,
  enterDescription,
  selectCategory
};
