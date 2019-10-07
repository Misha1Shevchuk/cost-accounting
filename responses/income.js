const enterAmount = { text: "Type amount:" };

const enterDescription = {
  text: "Write description: ",
  quick_replies: [
    {
      content_type: "text",
      title: "Skip",
      payload: "<INCOME_SKIP_DESCRIPTION>"
    },
    {
      content_type: "text",
      title: "Change amount",
      payload: "<INCOME_GO_BACK_TO_AMOUNT>"
    }
  ]
};

const saveIncome = {
  text: "Save income?",
  quick_replies: [
    {
      content_type: "text",
      title: "Save it",
      payload: "<SAVE_COST>"
    },
    {
      content_type: "text",
      title: "Change description",
      payload: "<INCOME_GO_BACK_TO_DESCRIPTION>"
    },
    {
      content_type: "text",
      title: "Change amount",
      payload: "<INCOME_GO_BACK_TO_AMOUNT>"
    }
  ]
};

module.exports = { saveEarning: saveIncome, enterAmount, enterDescription };
