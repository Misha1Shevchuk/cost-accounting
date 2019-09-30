const { getUserData } = require("../helpers/requests");
const { updateState, addState, getState } = require("../services/state");
const database = require("../services/user");
const callSendAPI = require("../controllers/callSendAPI");

const handlePostback = async (sender_psid, received_quickReply) => {
  let response;
  // Get the payload for the postback
  let payload = received_quickReply.payload;
  try {
    switch (payload) {
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
      case "<TRANSPORT>":
        response = { text: `Enter your cost:` };
        updateState(sender_psid, { category: "transport" });
        break;
      case "<ENTERTAINMENT>":
        response = { text: `Enter your cost:` };
        updateState(sender_psid, { category: "entertainment" });
        break;
      case "<CLOTHES>":
        response = { text: `Enter your cost:` };
        updateState(sender_psid, { category: "clothes" });
        break;
      case "<FOOD>":
        response = { text: `Enter your cost:` };
        updateState(sender_psid, { category: "food" });
        break;
      case "<OTHER>":
        response = { text: `Enter your cost:` };
        updateState(sender_psid, { category: "other" });
        break;
      case "<SKIP_DESCRIPTION>":
        response = { text: `Enter your cost:` };
        updateState(sender_psid, { description: "skipped" });
        break;
      default:
        response = {
          text: `I don't understand quick reply ${payload} yet.`
        };
        break;
    }
  } catch (err) {
    console.log(err);
  }
  // Send the response message
  callSendAPI(sender_psid, response);
};

module.exports = handlePostback;
