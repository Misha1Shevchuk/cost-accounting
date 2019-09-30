const callSendAPI = require("../controllers/callSendAPI");
const { updateState, getState, clearState } = require("../services/state");
const { addNewCost } = require("../services/cost");

const handleMessage = async (sender_psid, received_message) => {
  let response;
  let state = await getState(sender_psid);
  // Checks if the message contains text
  if (received_message) {
    // Started message
    if (received_message.toLowerCase() === "hello") {
      response = {
        text: `Hello!`,
        quick_replies: [
          {
            content_type: "text",
            title: "New cost",
            payload: "<ADD_COSTS>"
          },
          {
            content_type: "text",
            title: "Show statistic",
            payload: "<SHOW_STATISTIC>"
          }
        ]
      };
      clearState(sender_psid);

      // If user entered amount
    } else if (
      !isNaN(Number(received_message)) &&
      state.category &&
      !state.amount
    ) {
      response = {
        text: "Enter description: ",
        quick_replies: [
          {
            content_type: "text",
            title: "skip",
            payload: "<SKIP_DESCRIPTION>"
          }
        ]
      };
      updateState(sender_psid, { amount: Number(received_message) });
    } else if (state.amount && !state.description) {
      await callSendAPI(sender_psid, { text: "Cost saved" });
      response = {
        text: `What do you want to do?`,
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
      await updateState(sender_psid, { description: received_message });
      addNewCost(sender_psid, await getState(sender_psid));
      clearState(sender_psid);
    } else {
      response = {
        text: `I don't understand "${received_message}" yet.`
      };
    }
  }
  // Send the response message
  callSendAPI(sender_psid, response);
};

module.exports = handleMessage;
