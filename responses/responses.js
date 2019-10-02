const category = require("../helpers/categoriesEnum");

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
      title: category.TRANSPORT,
      payload: "<TRANSPORT>"
    },
    {
      content_type: "text",
      title: category.ENTERTAINMENT,
      payload: "<ENTERTAINMENT>"
    },
    {
      content_type: "text",
      title: category.CLOTHES,
      payload: "<CLOTHES>"
    },
    {
      content_type: "text",
      title: category.FOOD,
      payload: "<FOOD>"
    },
    {
      content_type: "text",
      title: category.OTHER,
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
  text: "Write description: ",
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
    },
    {
      content_type: "text",
      title: "Change category",
      payload: "<GO_BACK_TO_CATEGORIES>"
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
      },
      {
        content_type: "text",
        title: "Change amount",
        payload: "<GO_BACK_TO_AMOUNT>"
      },
      {
        content_type: "text",
        title: "Change category",
        payload: "<GO_BACK_TO_CATEGORIES>"
      }
    ]
  };
  return response;
};

module.exports.showStatistic = {
  text: "For which period?",
  quick_replies: [
    {
      content_type: "text",
      title: "Today",
      payload: "<STATISTIC_DAY>"
    },
    {
      content_type: "text",
      title: "This week",
      payload: "<STATISTIC_WEEK>"
    },
    {
      content_type: "text",
      title: "This month",
      payload: "<STATISTIC_MONTH>"
    }
  ]
};
