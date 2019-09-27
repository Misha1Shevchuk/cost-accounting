const callSendAPI = require("../controllers/callSendAPI");

const handleMessage = (sender_psid, received_message) => {
  let response;
  // Checks if the message contains text
  if (received_message) {
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    switch (received_message) {
      case "hello":
        response = {
          text: `Hello!`,
          quick_replies: [
            {
              content_type: "text",
              title: "Add costs",
              payload: "<ADD_COSTS>"
            },
            {
              content_type: "text",
              title: "Show statistic",
              payload: "<SHOW_STATISTIC>"
            }
          ]
        };
        break;
      default:
        response = {
          text: `I don't understand "${received_message}" yet.`
        };
    }
  }
  // Send the response message
  callSendAPI(sender_psid, response);
};

module.exports = handleMessage;
