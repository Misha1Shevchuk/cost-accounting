const { updateState, getState, clearState } = require("../services/state");
const callSendAPI = require("../controllers/callSendAPI");
const res = require("../responses/responses");

const handleMessage = async (sender_psid, received_message) => {
  let response;
  let state = await getState(sender_psid);

  // Checks if the message contains text
  if (received_message) {
    // Started message
    if (received_message.toLowerCase() === "test") {
      clearState(sender_psid);
      response = res.startedMessage;

      // If user entered amount
    } else if (state.category && !state.amount) {
      if (!isNaN(Number(received_message)) && Number(received_message) > 0) {
        response = res.enterDescription;
        updateState(sender_psid, { amount: Number(received_message) });
      } else {
        response = res.enterAmount;
      }

      // If user entered description
    } else if (state.amount && !state.description) {
      response = res.saveCost();
      await updateState(sender_psid, { description: received_message });

      // If user wrote text message when he had to select category
    } else if (state && !state.category) {
      response = res.selectCategory;
    } else {
      response = {
        text: `I don't understand message "${received_message}" yet.`
      };
    }
  }
  // Send the response message
  callSendAPI(sender_psid, response);
};

module.exports = handleMessage;
