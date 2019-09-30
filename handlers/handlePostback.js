const { getUserData } = require("../helpers/requests");
const callSendAPI = require("../controllers/callSendAPI");
const { addState, getState } = require("../services/state");
const { getUser, addNewUser } = require("../services/user");
const handleMessage = require("./handleMessage");

const handlePostback = async (sender_psid, received_postback) => {
  // Get the payload for the postback
  let payload = received_postback.payload;
  let response;

  switch (payload) {
    case "<GET_STARTED_PAYLOAD>":
      let userData = await getUserData(sender_psid);
      if (!(await getUser(sender_psid))) addNewUser(sender_psid, userData);
      handleMessage(sender_psid, "hello");
      break;
    case "<ADD_COSTS>":
      response = {
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
      if (!(await getState(sender_psid))) addState(sender_psid);
      break;
    case "<SHOW_STATISTIC>":
      response = { text: `Not ready yet` };
      break;
    default:
      response = {
        text: `I don't understand quick reply "${payload}" yet.`
      };
      break;
  }
  // Send the response message
  if (response) callSendAPI(sender_psid, response);
};

module.exports = handlePostback;
