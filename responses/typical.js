SERVER_URL = process.env.SERVER_URL;
const formMessage = require("../helpers/formMessages");

const getStartedMessage = userData => {
  const text = `Hello ${userData.first_name}! I'm MoneyCounterBot. I'll manage your money. How can I help you?`;
  const quickReplies = [
    { title: "Add expense", payload: "<ADD_EXPENSE>" },
    { title: "Add income", payload: "<ADD_INCOME>" }
  ];
  return formMessage.formQuickReplies(text, quickReplies);
};

const showMenu = senderPsid => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Money managing",
            subtitle: "What do you want to add?",
            image_url:
              "https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_306/how_to_spend_your_money_1200x627.jpg?quality=89&w=800",
            buttons: [
              {
                type: "postback",
                title: "Expense",
                payload: "<ADD_EXPENSE>"
              },
              {
                type: "postback",
                title: "Income",
                payload: "<ADD_INCOME>"
              }
            ]
          },
          {
            title: "Stats",
            subtitle: "What do you want to watch?",
            image_url:
              "https://c.pxhere.com/images/b9/27/e3c21934dcf17ccb54fdaf997f04-1584291.jpg!d",
            buttons: [
              {
                type: "postback",
                title: "Statistic",
                payload: "<SHOW_STATISTIC>"
              },
              {
                type: "web_url",
                title: "History",
                webview_height_ratio: "tall",
                webview_share_button: "hide",
                messenger_extensions: true,
                url: `${SERVER_URL}/webview/${senderPsid}`
              }
            ]
          }
        ]
      }
    }
  };
  return response;
};

const selectPeriodStatistic = () => {
  const text = "For which period?";
  const quickReplies = [
    { title: "Today", payload: "<STATISTIC_DAY>" },
    { title: "This week", payload: "<STATISTIC_WEEK>" },
    { title: "This month", payload: "<STATISTIC_MONTH>" },
    { title: "All time", payload: "<STATISTIC_ALL_TIME>" }
  ];
  return formMessage.formQuickReplies(text, quickReplies);
};

const showStatistic = statistic => {
  const text = statistic;
  const quickReplies = [
    { title: "Go to menu", payload: "<SHOW_MENU>" },
    { title: "Today", payload: "<STATISTIC_DAY>" },
    { title: "This week", payload: "<STATISTIC_WEEK>" },
    { title: "This month", payload: "<STATISTIC_MONTH>" },
    { title: "All time", payload: "<STATISTIC_ALL_TIME>" }
  ];
  return formMessage.formQuickReplies(text, quickReplies);
};

const createPersistentMenu = {
  persistent_menu: [
    {
      locale: "default",
      composer_input_disabled: false,
      call_to_actions: [
        {
          type: "postback",
          title: "New expense",
          payload: "<ADD_EXPENSE>"
        },
        {
          type: "postback",
          title: "New income",
          payload: "<ADD_INCOME>"
        },
        {
          title: "Show statistic",
          type: "nested",
          call_to_actions: [
            {
              type: "postback",
              title: "Today",
              payload: "<STATISTIC_DAY>"
            },
            {
              type: "postback",
              title: "This week",
              payload: "<STATISTIC_WEEK>"
            },
            {
              type: "postback",
              title: "This month",
              payload: "<STATISTIC_MONTH>"
            },
            {
              type: "postback",
              title: "All time",
              payload: "<STATISTIC_ALL_TIME>"
            }
          ]
        }
      ]
    }
  ]
};

module.exports = {
  getStartedMessage,
  showMenu,
  selectPeriodStatistic,
  showStatistic,
  createPersistentMenu
};
