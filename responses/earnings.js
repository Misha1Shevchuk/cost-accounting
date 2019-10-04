const enterAmount = { text: "Type amount:" };

const enterDescription = {
  text: "Write description: ",
  quick_replies: [
    {
      content_type: "text",
      title: "Skip",
      payload: "<EARNING_SKIP_DESCRIPTION>"
    },
    {
      content_type: "text",
      title: "Change amount",
      payload: "<EARNING_GO_BACK_TO_AMOUNT>"
    }
  ]
};

const saveEarning = {
  text: "Can i save your earning?",
  quick_replies: [
    {
      content_type: "text",
      title: "Save",
      payload: "<SAVE_COST>"
    },
    {
      content_type: "text",
      title: "Change description",
      payload: "<EARNING_GO_BACK_TO_DESCRIPTION>"
    },
    {
      content_type: "text",
      title: "Change amount",
      payload: "<EARNING_GO_BACK_TO_AMOUNT>"
    }
  ]
};

module.exports = { saveEarning, enterAmount, enterDescription };
