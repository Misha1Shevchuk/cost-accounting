const { updateState, getState, clearState } = require("../services/state");
const { addNewCost } = require("../services/cost");
const callSendAPI = require("../controllers/callSendAPI");
const res = require("../responses/responses");
const category = require("../helpers/categoriesEnum");
const {
  statisticDay,
  statisticMonth,
  statisticWeek
} = require("../helpers/statistic");
const { history } = require("../helpers/history");

const handlePostback = async (sender_psid, received_quickReply) => {
  let response;
  // Get the payload for the postback
  let payload = received_quickReply.payload;
  try {
    switch (payload) {
      // Categories:
      case "<TRANSPORT>":
        response = res.enterAmount;
        updateState(sender_psid, { category: category.TRANSPORT });
        break;
      case "<ENTERTAINMENT>":
        response = res.enterAmount;
        updateState(sender_psid, { category: category.ENTERTAINMENT });
        break;
      case "<CLOTHES>":
        response = res.enterAmount;
        updateState(sender_psid, { category: category.CLOTHES });
        break;
      case "<FOOD>":
        response = res.enterAmount;
        updateState(sender_psid, { category: category.FOOD });
        break;
      case "<BEAUTY_AND_HEALTH>":
        response = res.enterAmount;
        updateState(sender_psid, { category: category.BEAUTY_AND_HEALTH });
      case "<UTILITES>":
        response = res.enterAmount;
        updateState(sender_psid, { category: category.UTILITES });
        break;
      case "<OTHER>":
        response = res.enterAmount;
        updateState(sender_psid, { category: category.OTHER });
        break;

      // Amount
      case "<AMOUNT_50>":
        response = res.enterDescription;
        updateState(sender_psid, { amount: 50 });
        break;
      case "<AMOUNT_100>":
        response = res.enterDescription;
        updateState(sender_psid, { amount: 100 });
        break;
      case "<AMOUNT_200>":
        response = res.enterDescription;
        updateState(sender_psid, { amount: 200 });
        break;

      // Skip description
      case "<SKIP_DESCRIPTION>":
        response = res.saveCost();
        await updateState(sender_psid, { description: "skipped" });
        break;

      // Change
      case "<GO_BACK_TO_CATEGORIES>":
        response = res.selectCategory;
        updateState(sender_psid, {
          category: null,
          amount: null,
          description: null
        });
        break;
      case "<GO_BACK_TO_AMOUNT>":
        response = res.enterAmount;
        updateState(sender_psid, { amount: null, description: null });
        break;
      case "<GO_BACK_TO_DESCRIPTION>":
        response = res.enterDescription;
        updateState(sender_psid, { description: null });
        break;

      // Save cost
      case "<SAVE_COST>":
        callSendAPI(sender_psid, { text: "Spend saved" });
        response = res.startedMessage;
        addNewCost(sender_psid, await getState(sender_psid));
        clearState(sender_psid);
        break;

      // Statistic
      case "<STATISTIC_DAY>":
        callSendAPI(sender_psid, { text: await statisticDay(sender_psid) });
        response = res.startedMessage;

        break;
      case "<STATISTIC_WEEK>":
        callSendAPI(sender_psid, { text: await statisticWeek(sender_psid) });
        response = res.startedMessage;
        break;
      case "<STATISTIC_MONTH>":
        callSendAPI(sender_psid, { text: await statisticMonth(sender_psid) });
        response = res.startedMessage;
        break;

      default:
        response = {
          text: `I don't understand quick reply "${payload}" yet.`
        };
        break;
    }
  } catch (err) {
    console.log(err);
  }

  // Send the response message
  callSendAPI(sender_psid, response);
};

module.exports = handlePostback;
