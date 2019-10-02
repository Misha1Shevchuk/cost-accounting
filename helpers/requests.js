const axios = require("axios");
require("dotenv").config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const getUserData = async sender_psid => {
  return await axios
    .get(
      "https://graph.facebook.com/" +
        sender_psid +
        "?fields=first_name,last_name,profile_pic&access_token=" +
        PAGE_ACCESS_TOKEN
    )
    .then(request => request.data);
};

// Add button "get started"
const addGetStartedButton = () => {
  const data = {
    get_started: { payload: "<GET_STARTED_PAYLOAD>" },
    greeting: [
      {
        locale: "default",
        text: "Hello {{user_first_name}}! Lets started!"
      }
    ]
  };
  axios
    .post(
      `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
      data
    )
    .then(async res => {
      if (res.sender_psid) {
        let userData = await getUserData(res.sender_psid);
      }
    })
    .catch(err => err);
};

// Persistent menu
const addPersistentMenu = () => {
  const data = {
    persistent_menu: [
      {
        locale: "default",
        composer_input_disabled: false,
        call_to_actions: [
          {
            type: "postback",
            title: "New cost",
            payload: "<ADD_COSTS>"
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
              }
            ]
          }
        ]
      }
    ]
  };
  axios
    .post(
      `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
      data
    )
    .catch(err => err);
};

// sender action
const addSenderAction = sender_psid => {
  const data = {
    recipient: {
      id: sender_psid
    },
    sender_action: "typing_on"
  };
  axios
    .post(
      `https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      data
    )
    .catch(err => console.log(err));
};

module.exports = {
  getUserData,
  addGetStartedButton,
  addSenderAction,
  addPersistentMenu
};
