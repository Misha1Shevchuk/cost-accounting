const { getUserData } = require("./requests");
const database = require("../services/user");
const callSendAPI = require("../controllers/callSendAPI");
const checkMessage = require("../messages/checkMessage");

const handlePostback = async (sender_psid, received_quickReply) => {
  // Get the payload for the postback
  let payload = received_quickReply.payload;
  let text = payload.text;
  // Set the response based on the postback payload
  if (payload === "<POSTBACK_PAYLOAD>") {
  }
  switch (payload) {
    case "<ADD_COSTS>":
      console.log("selected add_costs");
      break;
    case "<SHOW_STATISTIC>":
      console.log("selected show_statistic");
      break;
    case "<TRANSPORT>":
      console.log("selected transport");
      break;
    case "<ENTERTAINMENT>":
      break;
    case "<CLOTHES>":
      break;
    case "<FOOD>":
      break;
    case "<OTHER>":
      break;

    default:
      break;
  }
};

module.exports = handlePostback;
