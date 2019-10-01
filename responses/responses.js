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

module.exports.enterDescription = {
  text: "Enter description: ",
  quick_replies: [
    {
      content_type: "text",
      title: "skip",
      payload: "<SKIP_DESCRIPTION>"
    }
  ]
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

module.exports.enterAmount = { text: `Enter amount:` };
