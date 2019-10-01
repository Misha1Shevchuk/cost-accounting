const callSendAPI = require("../controllers/callSendAPI");
const { updateState, getState, clearState } = require("../services/state");
const { addNewCost } = require("../services/cost");
const { getUser } = require("../services/user");
const res = require("../responses/responses");

const handleMessage = async (sender_psid, received_message) => {
  let response;
  let state = await getState(sender_psid);
  console.log(state);
  let user = await getUser(sender_psid);
  // Checks if the message contains text
  if (received_message) {
    // Started message
    if (received_message.toLowerCase() === "hello") {
      callSendAPI(sender_psid, { text: `Hello, ${user.first_name}!` });
      clearState(sender_psid);
      response = res.startedMessage;

      // If user entered amount
    } else if (state.category && !state.amount) {
      if (!isNaN(Number(received_message))) {
        response = res.enterDescription;
        updateState(sender_psid, { amount: Number(received_message) });
      } else {
        response = { text: `Enter your cost:` };
      }

      // If user entered description
    } else if (state.amount && !state.description) {
      await callSendAPI(sender_psid, { text: "Cost saved" });
      response = res.startedMessage;
      await updateState(sender_psid, { description: received_message });
      addNewCost(sender_psid, await getState(sender_psid));
      clearState(sender_psid);

      // If user wrote text message when he had to select category
    } else if (state && !state.category) {
      console.log("category");
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
