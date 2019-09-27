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
        console.log("UserData => " + userData);
      }
    })
    .catch(err => console.log(err));
};

module.exports = { getUserData, addGetStartedButton };
