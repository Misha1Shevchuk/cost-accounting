const { getUserData } = require("../helpers/requests");
const { addState, clearState } = require("../services/state");
const { getUser, addNewUser } = require("../services/user");
const callSendAPI = require("../controllers/callSendAPI");
const res = require("../responses/responses");

const {
  statisticDay,
  statisticMonth,
  statisticWeek
} = require("../helpers/statistic");

const handlePostback = async (sender_psid, received_postback) => {
  // Get the payload for the postback
  let payload = received_postback.payload;
  let response;

  switch (payload) {
    case "<GET_STARTED_PAYLOAD>":
      let userData = await getUserData(sender_psid);
      if (!(await getUser(sender_psid))) addNewUser(sender_psid, userData);
      callSendAPI(sender_psid, { text: `Hello ${userData.first_name}!` });
      response = res.startedMessage;
      break;
    case "<ADD_COSTS>":
      response = res.selectCategory;
      await clearState(sender_psid);
      addState(sender_psid);
      break;
    case "<SHOW_STATISTIC>":
      response = res.showStatistic;
      break;

    // Statistic
    case "<STATISTIC_DAY>":
      response = {
        text: await statisticDay(sender_psid),
        quick_replies: [
          {
            content_type: "text",
            title: "Watch history",
            payload: "<WATCH_HISTORY_DAY>"
          }
        ]
      };
      break;
    case "<STATISTIC_WEEK>":
      response = {
        text: await statisticWeek(sender_psid),
        quick_replies: [
          {
            content_type: "text",
            title: "Watch history",
            payload: "<WATCH_HISTORY_WEEK>"
          }
        ]
      };
      break;
    case "<STATISTIC_MONTH>":
      response = {
        text: await statisticMonth(sender_psid),
        quick_replies: [
          {
            content_type: "text",
            title: "Watch history",
            payload: "<WATCH_HISTORY_MONTH>"
          }
        ]
      };
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
