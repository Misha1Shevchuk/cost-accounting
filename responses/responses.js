module.exports.startedMessage = {
  attachment: {
    type: "template",
    payload: {
      template_type: "button",
      text: "What do you want to do?",
      buttons: [
        {
          type: "postback",
          title: "New cost",
          payload: "<ADD_COSTS>"
        },
        {
          type: "postback",
          title: "Show statistic",
          payload: "<SHOW_STATISTIC>"
        }
      ]
    }
  }
};

module.exports.selectCategory = {
  text: "Select category",
  quick_replies: [
    {
      content_type: "text",
      title: "transport",
      payload: "<TRANSPORT>"
    },
    {
      content_type: "text",
      title: "entertainment",
      payload: "<ENTERTAINMENT>"
    },
    {
      content_type: "text",
      title: "clothes",
      payload: "<CLOTHES>"
    },
    {
      content_type: "text",
      title: "food",
      payload: "<FOOD>"
    },
    {
      content_type: "text",
      title: "other",
      payload: "<OTHER>"
    }
  ]
};

module.exports.enterAmount = {
  text: `Enter amount:`,
  quick_replies: [
    {
      content_type: "text",
      title: "50",
      payload: "<AMOUNT_50>"
    },
    {
      content_type: "text",
      title: "100",
      payload: "<AMOUNT_100>"
    },
    {
      content_type: "text",
      title: "200",
      payload: "<AMOUNT_200>"
    },
    {
      content_type: "text",
      title: "Change category",
      payload: "<GO_BACK_TO_CATEGORIES>"
    }
  ]
};

module.exports.enterDescription = {
  text: "Enter description: ",
  quick_replies: [
    {
      content_type: "text",
      title: "Skip",
      payload: "<SKIP_DESCRIPTION>"
    },
    {
      content_type: "text",
      title: "Change amount",
      payload: "<GO_BACK_TO_AMOUNT>"
    }
  ]
};

module.exports.saveCost = () => {
  response = {
    text: "Can i save your cost?",
    quick_replies: [
      {
        content_type: "text",
        title: "Save",
        payload: "<SAVE_COST>"
      },
      {
        content_type: "text",
        title: "Change description",
        payload: "<GO_BACK_TO_DESCRIPTION>"
      }
    ]
  };
  return response;
};
