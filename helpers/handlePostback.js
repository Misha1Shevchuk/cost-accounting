const { getUserData } = require("./requests");
const database = require("../services/user");
const callSendAPI = require("../controllers/callSendAPI");
const checkMessage = require("../messages/checkMessage");

const handlePostback = async (sender_psid, received_postback) => {
  // Get the payload for the postback
  let payload = received_postback.payload;
  console.log(payload);
  // Set the response based on the postback payload
  if (payload === "<GET_STARTED_PAYLOAD>") {
    let userData = await getUserData(sender_psid);
    let users = await database.checkUser(sender_psid);
    if (!users) {
      database.addNewUser(sender_psid, userData);
    }
    callSendAPI(sender_psid, checkMessage({ text: "hello" }));
  }
};

module.exports = handlePostback;
