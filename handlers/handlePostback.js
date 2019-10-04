const { getUserData } = require("../helpers/requests");
const state = require("../services/state");
const { getUser, addNewUser } = require("../services/user");
const callSendAPI = require("../controllers/callSendAPI");
const { startedMessage, showStatistic, goOn } = require("../responses/typical");
const spend = require("../responses/spends");
const earning = require("../responses/earnings");
const statistic = require("../helpers/statistic");
require("dotenv").config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const handlePostback = async (sender_psid, received_postback) => {
  // Get the payload for the postback
  let payload = received_postback.payload;
  let response;

  switch (payload) {
    case "<GET_STARTED_PAYLOAD>":
      let userData = await getUserData(sender_psid, PAGE_ACCESS_TOKEN);
      if (!(await getUser(sender_psid))) addNewUser(sender_psid, userData);
      setTimeout(() => {
        callSendAPI(sender_psid, startedMessage(sender_psid));
      }, 1000);
      response = { text: `Hello ${userData.first_name}!` };
      break;
    case "<ADD_SPEND>":
      response = spend.selectCategory;
      await state.clear(sender_psid);
      await state.add(sender_psid);
      break;

    // Add Earning
    case "<ADD_EARNING>":
      response = earning.enterAmount;
      await state.clear(sender_psid);
      await state.add(sender_psid);
      await state.update(sender_psid, { category: "earning" });
      break;

    case "<SHOW_STATISTIC>":
      response = showStatistic;
      break;
    // Statistic
    case "<STATISTIC_DAY>":
      response = goOn(await statistic.Day(sender_psid));
      break;
    case "<STATISTIC_WEEK>":
      response = goOn(await statistic.Week(sender_psid));
      break;
    case "<STATISTIC_MONTH>":
      response = goOn(await statistic.Month(sender_psid));
      break;

    default:
      response = {
        text: `I don't understand postback "${payload}" yet.`
      };
      break;
  }
  // Send the response message
  if (response) callSendAPI(sender_psid, response);
};

module.exports = handlePostback;