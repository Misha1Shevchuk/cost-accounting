const { getUserData, callSendAPI } = require("../helpers/requests");
const state = require("../services/state");
const { getUser, addNewUser } = require("../services/user");
const {
  getStartedMessage,
  selectPeriodStatistic,
  showStatistic
} = require("../responses/typical");
const spend = require("../responses/expense");
const earning = require("../responses/income");
const statistic = require("../helpers/statistic");

const handlePostback = async (senderPsid, receivedPostback) => {
  // Get the payload for the postback
  let payload = receivedPostback.payload;
  let response;

  switch (payload) {
    case "<GET_STARTED_PAYLOAD>":
      let userData = await getUserData(senderPsid);
      if (!(await getUser(senderPsid))) addNewUser(senderPsid, userData);
      response = getStartedMessage(userData);
      break;
    case "<ADD_EXPENSE>":
      response = spend.selectCategory();
      await state.clear(senderPsid);
      await state.add(senderPsid);
      break;
    case "<ADD_INCOME>":
      response = earning.enterAmount();
      await state.clear(senderPsid);
      await state.add(senderPsid);
      await state.update(senderPsid, { category: "Income" });
      break;

    case "<SHOW_STATISTIC>":
      response = selectPeriodStatistic();
      break;
    // Statistic
    case "<STATISTIC_DAY>":
      response = showStatistic(await statistic.day(senderPsid));
      break;
    case "<STATISTIC_WEEK>":
      response = showStatistic(await statistic.week(senderPsid));
      break;
    case "<STATISTIC_MONTH>":
      response = showStatistic(await statistic.month(senderPsid));
      break;
    case "<STATISTIC_ALL_TIME>":
      response = showStatistic(await statistic.allTime(senderPsid));
      break;

    default:
      response = {
        text: `I don't understand postback "${payload}" yet.`
      };
      break;
  }
  // Send the response message
  if (response) callSendAPI(senderPsid, response);
};

module.exports = handlePostback;
