const { updateState, getState, clearState } = require("../services/state");
const callSendAPI = require("../controllers/callSendAPI");
const { addNewCost } = require("../services/cost");
const res = require("../responses/responses");

const handlePostback = async (sender_psid, received_quickReply) => {
  let response;
  // Get the payload for the postback
  let payload = received_quickReply.payload;
  try {
    switch (payload) {
      // Categories:
      case "<TRANSPORT>":
        response = res.enterAmount;
        updateState(sender_psid, { category: "transport" });
        break;
      case "<ENTERTAINMENT>":
        response = res.enterAmount;
        updateState(sender_psid, { category: "entertainment" });
        break;
      case "<CLOTHES>":
        response = res.enterAmount;
        updateState(sender_psid, { category: "clothes" });
        break;
      case "<FOOD>":
        response = res.enterAmount;
        updateState(sender_psid, { category: "food" });
        break;
      case "<OTHER>":
        response = res.enterAmount;
        updateState(sender_psid, { category: "other" });
        break;

      // Skip description
      case "<SKIP_DESCRIPTION>":
        await callSendAPI(sender_psid, { text: "Cost saved" });
        response = res.startedMessage;
        await updateState(sender_psid, { description: "skipped" });
        addNewCost(sender_psid, await getState(sender_psid));
        clearState(sender_psid);
        break;

      default:
        response = {
          text: `I don't understand quick reply "${payload}" yet.`
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
