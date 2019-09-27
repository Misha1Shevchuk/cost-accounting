const callSendAPI = require("../controllers/callSendAPI");
const checkMessage = require("../messages/checkMessage");

const handleMessage = (sender_psid, received_message) => {
  let response;
  // Checks if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = checkMessage(received_message.text);
  }
  // Send the response message
  callSendAPI(sender_psid, response);
};

module.exports = handleMessage;
