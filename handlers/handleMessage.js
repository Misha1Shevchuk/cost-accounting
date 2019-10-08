const state = require("../services/state");
const { callSendAPI } = require("../helpers/requests");
const { showMenu } = require("../responses/typical");
const checkTextMessage = require("../helpers/checkTextMessages");

const handleMessage = async (senderPsid, receivedMessage) => {
  let response;
  let userState = await state.get(senderPsid);

  // Checks if the message contains text
  if (receivedMessage) {
    // Started message
    if (receivedMessage.toLowerCase() === "test") {
      state.clear(senderPsid);
      response = showMenu(senderPsid);

      // If user entered amount
    } else if (userState.category && !userState.amount) {
      response = checkTextMessage.enterAmount(senderPsid, receivedMessage);

      // If user entered description
    } else if (userState.amount && !userState.description) {
      response = checkTextMessage.enterDescription(senderPsid, receivedMessage);

      //If user wrote text when he had to select option "save" in quick replies
    } else if (userState.description) {
      response = checkTextMessage.textWhenSaveErr();

      // If user wrote text message when he had to select category
    } else if (userState && !userState.category) {
      response = checkTextMessage.textWhenSelectCategoryErr();
    } else {
      response = {
        text: `I don't understand message "${receivedMessage}" yet.`
      };
    }
  }
  // Send the response message
  callSendAPI(senderPsid, response);
};

module.exports = handleMessage;
