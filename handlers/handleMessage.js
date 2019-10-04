const state = require("../services/state");
const callSendAPI = require("../controllers/callSendAPI");
const { startedMessage } = require("../responses/typical");
const spend = require("../responses/spends");
const earning = require("../responses/earnings");

const handleMessage = async (sender_psid, received_message) => {
  let response;
  let userState = await state.get(sender_psid);

  // Checks if the message contains text
  if (received_message) {
    // Started message
    if (received_message.toLowerCase() === "test") {
      state.clear(sender_psid);
      response = startedMessage(sender_psid);

      // If user entered amount
    } else if (userState.category && !userState.amount) {
      if (!isNaN(Number(received_message)) && Number(received_message) > 0) {
        userState.category !== "earning"
          ? (response = spend.enterDescription)
          : (response = earning.enterDescription);
        state.update(sender_psid, { amount: Number(received_message) });
      } else {
        userState.category !== "earning"
          ? (response = spend.enterAmount)
          : (response = earning.enterAmount);
      }

      // If user entered description
    } else if (userState.amount && !userState.description) {
      userState.category !== "earning"
        ? (response = spend.saveSpend)
        : (response = earning.saveEarning);
      await state.update(sender_psid, { description: received_message });

      // If user wrote text message when he had to select category
    } else if (userState && !userState.category) {
      response = spend.selectCategory;
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