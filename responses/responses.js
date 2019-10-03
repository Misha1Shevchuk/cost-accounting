const category = require("../helpers/categoriesEnum");
require("dotenv").config();
SERVER_URL = process.env.SERVER_URL;

module.exports.startedMessage = {
  attachment: {
    type: "template",
    payload: {
      template_type: "generic",
      elements: [
        {
          title: "Money",
          subtitle: "What do you want to add?",
          image_url:
            "https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_306/how_to_spend_your_money_1200x627.jpg?quality=89&w=800",
          buttons: [
            {
              type: "postback",
              title: "spend",
              payload: "<ADD_COSTS>"
            },
            {
              type: "postback",
              title: "profit",
              payload: "<ADD_PROFIT>"
            }
          ]
        },
        {
          title: "Statistic",
          subtitle: "What do you want to watch?",
          image_url:
            "https://c.pxhere.com/images/b9/27/e3c21934dcf17ccb54fdaf997f04-1584291.jpg!d",
          buttons: [
            {
              type: "postback",
              title: "statistic",
              payload: "<SHOW_STATISTIC>"
            },
            {
              type: "web_url",
              title: "history",
              webview_height_ratio: "tall",
              messenger_extensions: true,
              url: SERVER_URL + "/webview"
            }
          ]
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
    text: "Can i save your spend?",
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
