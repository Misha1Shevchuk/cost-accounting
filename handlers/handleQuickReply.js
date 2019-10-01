const { updateState, getState, clearState } = require("../services/state");
const _cost = require("../services/cost");
const callSendAPI = require("../controllers/callSendAPI");
const res = require("../responses/responses");

const handlePostback = async (sender_psid, received_quickReply) => {
  let response;
  // Get the payload for the postback
  let payload = received_quickReply.payload;
  try {
    switch (payload) {
      // Categories:
      case "<TRANSPORT>":
        response = res.enterAmount;
        updateState(sender_psid, { category: "transport" });
        break;
      case "<ENTERTAINMENT>":
        response = res.enterAmount;
        updateState(sender_psid, { category: "entertainment" });
        break;
      case "<CLOTHES>":
        response = res.enterAmount;
        updateState(sender_psid, { category: "clothes" });
        break;
      case "<FOOD>":
        response = res.enterAmount;
        updateState(sender_psid, { category: "food" });
        break;
      case "<OTHER>":
        response = res.enterAmount;
        updateState(sender_psid, { category: "other" });
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
        updateState(sender_psid, { category: null });
        break;
      case "<GO_BACK_TO_AMOUNT>":
        response = res.enterAmount;
        updateState(sender_psid, { amount: null });
        break;
      case "<GO_BACK_TO_DESCRIPTION>":
        response = res.enterDescription;
        updateState(sender_psid, { description: null });
        break;

      // Save cost
      case "<SAVE_COST>":
        callSendAPI(sender_psid, { text: "Cost saved" });
        response = res.startedMessage;
        _cost.addNewCost(sender_psid, await getState(sender_psid));
        clearState(sender_psid);
        break;

      // Statistic
      case "<STATISTIC_DAY>":
        response = { text: "statistic for today" };
        console.log(await _cost.getCosts_today(sender_psid));
        break;
      case "<STATISTIC_WEEK>":
        response = { text: "statistic for this week" };
        console.log(await _cost.getCosts_week(sender_psid));
        break;
      case "<STATISTIC_MONTH>":
        response = { text: "statistic for this month" };
        console.log(await _cost.getCosts_month(sender_psid));
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
