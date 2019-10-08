const axios = require("axios");
const { createPersistentMenu } = require("../responses/typical");
require("dotenv").config();
PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
SERVER_URL = process.env.SERVER_URL;

// Get user data
const getUserData = senderPsid => {
  return axios
    .get(
      `https://graph.facebook.com/${senderPsid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`
    )
    .then(request => request.data)
    .catch(err => console.error(err));
};

// Add button "get started"
const addGetStartedButton = () => {
  const data = {
    get_started: { payload: "<GET_STARTED_PAYLOAD>" },
    greeting: [
      {
        locale: "default",
        text: "Hello, {{user_first_name}}! Lets started!"
      }
    ]
  };
  axios
    .post(
      `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
      data
    )
    .catch(err => console.error(err));
};

// Add button "get started"
const addUrlToWhiteList = () => {
  const data = {
    whitelisted_domains: [SERVER_URL]
  };
  axios
    .post(
      `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
      data
    )
    .catch(err => console.error(err));
};

// Persistent menu
const addPersistentMenu = () => {
  axios
    .post(
      `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
      createPersistentMenu
    )
    .then(data => data)
    .catch(err => console.error(err));
};

// Sender action
const addSenderAction = senderPsid => {
  const data = {
    recipient: {
      id: senderPsid
    },
    sender_action: "typing_on"
  };
  axios
    .post(
      `https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      data
    )
    .catch(err => console.error(err));
};

const callSendAPI = async (senderPsid, response) => {
  // Construct the message body
  let request_body = {
    recipient: {
      id: senderPsid
    },
    message: await response
  };

  axios
    .post(
      `https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      request_body
    )
    .catch(err => console.error(err));
};

module.exports = {
  getUserData,
  addGetStartedButton,
  addSenderAction,
  addPersistentMenu,
  addUrlToWhiteList,
  callSendAPI
};
