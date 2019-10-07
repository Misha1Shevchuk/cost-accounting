const formMessage = require("../helpers/formMessages");

const enterAmount = () => {
  return { text: "Type amount:" };
};

const enterDescription = () => {
  const text = "Write description:";
  let quickReplies = [
    { title: "Skip", payload: "<INCOME_SKIP_DESCRIPTION>" },
    { title: "Change amount", payload: "<INCOME_GO_BACK_TO_AMOUNT>" }
  ];
  return formMessage.formQuickReplies(text, quickReplies);
};

const saveIncome = () => {
  const text = "Save income?";
  let quickReplies = [
    { title: "Save it", payload: "<SAVE_COST>" },
    { title: "Change description", payload: "<INCOME_GO_BACK_TO_DESCRIPTION>" },
    { title: "Change amount", payload: "<INCOME_GO_BACK_TO_AMOUNT>" }
  ];
  return formMessage.formQuickReplies(text, quickReplies);
};

module.exports = { saveIncome, enterAmount, enterDescription };
