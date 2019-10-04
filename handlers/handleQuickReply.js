const state = require("../services/state");
const { addNewCost } = require("../services/cost");
const callSendAPI = require("../controllers/callSendAPI");
const { startedMessage, goOn } = require("../responses/typical");
const category = require("../helpers/categoriesEnum");
const {
  enterAmount,
  enterDescription,
  selectCategory,
  saveSpend
} = require("../responses/spends");
const statistic = require("../helpers/statistic");

const handlePostback = async (sender_psid, received_quickReply) => {
  let response;
  // Get the payload for the postback
  let payload = received_quickReply.payload;
  try {
    switch (payload) {
      // Categories:
      case "<TRANSPORT>":
        response = enterAmount;
        state.update(sender_psid, { category: category.TRANSPORT });
        break;
      case "<ENTERTAINMENT>":
        response = enterAmount;
        state.update(sender_psid, { category: category.ENTERTAINMENT });
        break;
      case "<CLOTHES>":
        response = enterAmount;
        state.update(sender_psid, { category: category.CLOTHES });
        break;
      case "<FOOD>":
        response = enterAmount;
        state.update(sender_psid, { category: category.FOOD });
        break;
      case "<BEAUTY_AND_HEALTH>":
        response = enterAmount;
        state.update(sender_psid, {
          category: category.BEAUTY_AND_HEALTH
        });
        break;
      case "<UTILITES>":
        response = enterAmount;
        state.update(sender_psid, { category: category.UTILITES });
        break;
      case "<OTHER>":
        response = enterAmount;
        state.update(sender_psid, { category: category.OTHER });
        break;

      // Amount
      case "<AMOUNT_50>":
        response = enterDescription;
        state.update(sender_psid, { amount: 50 });
        break;
      case "<AMOUNT_100>":
        response = enterDescription;
        state.update(sender_psid, { amount: 100 });
        break;
      case "<AMOUNT_200>":
        response = enterDescription;
        state.update(sender_psid, { amount: 200 });
        break;

      // Skip description
      case "<SKIP_DESCRIPTION>":
        response = saveSpend;
        await state.update(sender_psid, { description: "skipped" });
        break;

      // Change
      case "<GO_BACK_TO_CATEGORIES>":
        response = selectCategory;
        state.update(sender_psid, {
          category: null,
          amount: null,
          description: null
        });
        break;
      case "<GO_BACK_TO_AMOUNT>":
        response = enterAmount;
        state.update(sender_psid, { amount: null, description: null });
        break;
      case "<GO_BACK_TO_DESCRIPTION>":
        response = enterDescription;
        state.update(sender_psid, { description: null });
        break;

      // Change earning
      case "<EARNING_GO_BACK_TO_AMOUNT>":
        response = enterAmount;
        state.update(sender_psid, { amount: null, description: null });
        break;
      case "<EARNING_GO_BACK_TO_DESCRIPTION>":
        response = enterDescription;
        state.update(sender_psid, { description: null });
        break;

      // Save spend or earning
      case "<SAVE_COST>":
        response = startedMessage(sender_psid);
        await addNewCost(sender_psid, await state.get(sender_psid));
        callSendAPI(sender_psid, { text: "Saved" });
        state.clear(sender_psid);
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

      // Show started message
      case "<STARTED_MESSAGE>":
        response = startedMessage(sender_psid);
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
  callSendAPI(sender_psid, await response);
};

module.exports = handlePostback;