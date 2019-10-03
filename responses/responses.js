const category = require("../helpers/categoriesEnum");
require("dotenv").config();
SERVER_URL = process.env.SERVER_URL;

module.exports.startedMessage = {
  attachment: {
    type: "template",
    payload: {
      template_type: "button",
      text: "What do you want to do?",
      buttons: [
        {
          type: "postback",
          title: "Add new cost",
          payload: "<ADD_COSTS>"
        },
        {
          type: "postback",
          title: "Watch statistic",
          payload: "<SHOW_STATISTIC>"
        },
        {
          type: "web_url",
          title: "Watch history",
          webview_height_ratio: "tall",
          messenger_extensions: true,
          url: SERVER_URL + "/webview"
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
      title: category.PROFIT,
      payload: "<PROFIT>"
    },
    {
      content_type: "text",
      title: category.TRANSPORT,
      payload: "<TRANSPORT>"
    },
    {
      content_type: "text",
      title: category.FOOD,
      payload: "<FOOD>"
    },
    {
      content_type: "text",
      title: category.ENTERTAINMENT,
      payload: "<ENTERTAINMENT>"
    },
    {
      content_type: "text",
      title: category.BEAUTY_AND_HEALTH,
      payload: "<BEAUTY_AND_HEALTH>"
    },
    {
      content_type: "text",
      title: category.CLOTHES,
      payload: "<CLOTHES>"
    },
    {
      content_type: "text",
      title: category.UTILITES,
      payload: "<UTILITES>"
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
