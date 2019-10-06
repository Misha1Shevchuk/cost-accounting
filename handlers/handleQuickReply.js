const state = require("../services/state");
const { addNewCost } = require("../services/cost");
const callSendAPI = require("../controllers/callSendAPI");
const { startedMessage, showStatistic } = require("../responses/typical");
const category = require("../helpers/categoriesEnum");
const expense = require("../responses/expense");
const income = require("../responses/income");
const statistic = require("../helpers/statistic");

const handlePostback = async (sender_psid, received_quickReply) => {
  let response;
  // Get the payload for the postback
  let payload = received_quickReply.payload;
  try {
    switch (payload) {
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

      // Categories:
      case "<TRANSPORT>":
        response = expense.enterAmount;
        state.update(sender_psid, { category: category.TRANSPORT });
        break;
      case "<ENTERTAINMENT>":
        response = expense.enterAmount;
        state.update(sender_psid, { category: category.ENTERTAINMENT });
        break;
      case "<CLOTHES>":
        response = expense.enterAmount;
        state.update(sender_psid, { category: category.CLOTHES });
        break;
      case "<FOOD>":
        response = expense.enterAmount;
        state.update(sender_psid, { category: category.FOOD });
        break;
      case "<BEAUTY_AND_HEALTH>":
        response = expense.enterAmount;
        state.update(sender_psid, {
          category: category.BEAUTY_AND_HEALTH
        });
        break;
      case "<UTILITES>":
        response = expense.enterAmount;
        state.update(sender_psid, { category: category.UTILITES });
        break;
      case "<OTHER>":
        response = expense.enterAmount;
        state.update(sender_psid, { category: category.OTHER });
        break;

      // Amount
      case "<AMOUNT_50>":
        response = expense.enterDescription;
        state.update(sender_psid, { amount: 50 });
        break;
      case "<AMOUNT_100>":
        response = expense.enterDescription;
        state.update(sender_psid, { amount: 100 });
        break;
      case "<AMOUNT_200>":
        response = expense.enterDescription;
        state.update(sender_psid, { amount: 200 });
        break;

      // Skip description
      case "<SKIP_DESCRIPTION>":
        response = expense.saveSpend;
        await state.update(sender_psid, { description: "skipped" });
        break;
      case "<INCOME_SKIP_DESCRIPTION>":
        response = income.saveEarning;
        await state.update(sender_psid, { description: "skipped" });
        break;

      // Change
      case "<GO_BACK_TO_CATEGORIES>":
        response = expense.selectCategory;
        state.update(sender_psid, {
          category: null,
          amount: null,
          description: null
        });
        break;
      case "<GO_BACK_TO_AMOUNT>":
        response = expense.enterAmount;
        state.update(sender_psid, { amount: null, description: null });
        break;
      case "<GO_BACK_TO_DESCRIPTION>":
        response = expense.enterDescription;
        state.update(sender_psid, { description: null });
        break;

      // Change earning
      case "<INCOME_GO_BACK_TO_AMOUNT>":
        response = income.enterAmount;
        state.update(sender_psid, { amount: null, description: null });
        break;
      case "<INCOME_GO_BACK_TO_DESCRIPTION>":
        response = income.enterDescription;
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
