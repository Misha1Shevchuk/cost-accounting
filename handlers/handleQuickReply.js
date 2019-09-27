const { getUserData } = require("../helpers/requests");
const database = require("../services/user");
const callSendAPI = require("../controllers/callSendAPI");

const handlePostback = async (sender_psid, received_quickReply) => {
  let response;
  // Get the payload for the postback
  let payload = received_quickReply.payload;

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
      break;
    case "<SHOW_STATISTIC>":
      response = { text: `Not ready yet` };
      break;
    case "<TRANSPORT>":
      response = { text: `Enter your cost:` };
      break;
    case "<ENTERTAINMENT>":
      response = { text: `Enter your cost:` };
      break;
    case "<CLOTHES>":
      response = { text: `Enter your cost:` };
      break;
    case "<FOOD>":
      response = { text: `Enter your cost:` };
      break;
    case "<OTHER>":
      response = { text: `Enter your cost:` };
      break;
    default:
      response = {
        text: `I don't understand quick reply ${payload} yet.`
      };
      break;
  }

  // Send the response message
  callSendAPI(sender_psid, response);
};

module.exports = handlePostback;
