require("dotenv").config();
SERVER_URL = process.env.SERVER_URL;

const startedMessage = sender_psid => {
  let response = {
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
                payload: "<ADD_SPEND>"
              },
              {
                type: "postback",
                title: "earning",
                payload: "<ADD_EARNING>"
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
                url: SERVER_URL + "/webview/" + sender_psid
              }
            ]
          }
        ]
      }
    }
  };
  return response;
};

const showStatistic = {
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

const goOn = statistic => {
  response = {
    text: statistic,
    quick_replies: [
      {
        content_type: "text",
        title: "Go on!",
        payload: "<STARTED_MESSAGE>"
      }
    ]
  };
  return response;
};

module.exports = { startedMessage, showStatistic, goOn };
