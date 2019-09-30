const { getUserData } = require("../helpers/requests");
const { getUser, addNewUser } = require("../services/user");
const handleMessage = require("./handleMessage");

const handlePostback = async (sender_psid, received_postback) => {
  // Get the payload for the postback
  let payload = received_postback.payload;
  // Set the response based on the postback payload
  if (payload === "<GET_STARTED_PAYLOAD>") {
    let userData = await getUserData(sender_psid);
    if (!(await getUser(sender_psid))) addNewUser(sender_psid, userData);
    handleMessage(sender_psid, "hello");
  }
};

module.exports = handlePostback;
