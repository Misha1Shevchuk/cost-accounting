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

const checkMessage = (received_message, userData) => {
  let message;
  // console.log(userData);
  switch (received_message.text) {
    case "hello":
      message = `Hello, ${userData.first_name}!`;
      break;

    default:
      message = `You sent the message: "${received_message.text}". Now send me an attachment!`;
  }
  return message;
};

module.exports = { checkMessage, getUserData };
