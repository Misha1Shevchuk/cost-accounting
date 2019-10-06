const { getUserData } = require("../helpers/requests");
const state = require("../services/state");
const { getUser, addNewUser } = require("../services/user");
const callSendAPI = require("../controllers/callSendAPI");
const {
  startedMessage,
  selectPeriodStatistic,
  showStatistic
} = require("../responses/typical");
const spend = require("../responses/expense");
const earning = require("../responses/income");
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
      response = {
        text:
          "Hello " +
          userData.first_name +
          "!\nI'm MoneyCounterBot. I'll manage your money.\nHow can I help you?",
        quick_replies: [
          {
            content_type: "text",
            title: "Expense",
            payload: "<ADD_SPEND>"
          },
          {
            content_type: "text",
            title: "Income",
            payload: "<ADD_INCOME>"
          }
        ]
      };
      console.log(response);

      break;
    case "<ADD_SPEND>":
      response = spend.selectCategory;
      await state.clear(sender_psid);
      await state.add(sender_psid);
      break;
    case "<ADD_INCOME>":
      response = earning.enterAmount;
      await state.clear(sender_psid);
      await state.add(sender_psid);
      await state.update(sender_psid, { category: "Income" });
      break;

    case "<SHOW_STATISTIC>":
      response = selectPeriodStatistic;
      break;
    // Statistic
    case "<STATISTIC_DAY>":
      response = showStatistic(await statistic.day(sender_psid));
      break;
    case "<STATISTIC_WEEK>":
      response = showStatistic(await statistic.week(sender_psid));
      break;
    case "<STATISTIC_MONTH>":
      response = showStatistic(await statistic.month(sender_psid));
      break;
    case "<STATISTIC_ALL_TIME>":
      response = showStatistic(await statistic.allTime(sender_psid));
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
