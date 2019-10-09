const state = require("../services/state");
const { addNewCost } = require("../services/cost");
const { callSendAPI } = require("../helpers/requests");
const { showMenu, showStatistic } = require("../responses/typical");
const category = require("../helpers/categoriesEnum");
const INCOME = require("../helpers/incomesEnum");
const expense = require("../responses/expense");
const income = require("../responses/income");
const statistic = require("../helpers/statistic");

const handlePostback = async (senderPsid, receivedQuickReply) => {
  let response;
  // Get the payload for the postback
  let payload = receivedQuickReply.payload;
  try {
    switch (payload) {
      case "<ADD_EXPENSE>":
        response = expense.selectCategory();
        await state.clear(senderPsid);
        await state.add(senderPsid);
        break;
      case "<ADD_INCOME>":
        response = income.enterAmount();
        await state.clear(senderPsid);
        await state.add(senderPsid);
        await state.update(senderPsid, { category: INCOME });
        break;

      // Categories:
      case "<TRANSPORT>":
        response = expense.enterAmount();
        state.update(senderPsid, { category: category.TRANSPORT });
        break;
      case "<ENTERTAINMENT>":
        response = expense.enterAmount();
        state.update(senderPsid, { category: category.ENTERTAINMENT });
        break;
      case "<CLOTHES>":
        response = expense.enterAmount();
        state.update(senderPsid, { category: category.CLOTHES });
        break;
      case "<FOOD>":
        response = expense.enterAmount();
        state.update(senderPsid, { category: category.FOOD });
        break;
      case "<BEAUTY_AND_HEALTH>":
        response = expense.enterAmount();
        state.update(senderPsid, {
          category: category.BEAUTY_AND_HEALTH
        });
        break;
      case "<UTILITES>":
        response = expense.enterAmount();
        state.update(senderPsid, { category: category.UTILITES });
        break;
      case "<OTHER>":
        response = expense.enterAmount();
        state.update(senderPsid, { category: category.OTHER });
        break;

      // Amount
      case "<AMOUNT_50>":
        response = expense.enterDescription();
        state.update(senderPsid, { amount: 50 });
        break;
      case "<AMOUNT_100>":
        response = expense.enterDescription();
        state.update(senderPsid, { amount: 100 });
        break;
      case "<AMOUNT_200>":
        response = expense.enterDescription();
        state.update(senderPsid, { amount: 200 });
        break;

      // Skip description
      case "<SKIP_DESCRIPTION>":
        response = expense.saveExpense();
        await state.update(senderPsid, { description: "skipped" });
        break;
      case "<INCOME_SKIP_DESCRIPTION>":
        response = income.saveIncome();
        await state.update(senderPsid, { description: "skipped" });
        break;

      // Change
      case "<GO_BACK_TO_CATEGORIES>":
        response = expense.selectCategory();
        console.log(response);

        state.update(senderPsid, {
          category: null,
          amount: null,
          description: null
        });
        break;
      case "<GO_BACK_TO_AMOUNT>":
        response = expense.enterAmount();
        state.update(senderPsid, { amount: null, description: null });
        break;
      case "<GO_BACK_TO_DESCRIPTION>":
        response = expense.enterDescription();
        state.update(senderPsid, { description: null });
        break;

      // Change earning
      case "<INCOME_GO_BACK_TO_AMOUNT>":
        response = income.enterAmount();
        state.update(senderPsid, { amount: null, description: null });
        break;
      case "<INCOME_GO_BACK_TO_DESCRIPTION>":
        response = income.enterDescription();
        state.update(senderPsid, { description: null });
        break;

      // Save spend or earning
      case "<SAVE_COST>":
        response = showMenu(senderPsid);
        await addNewCost(senderPsid, await state.get(senderPsid));
        callSendAPI(senderPsid, { text: "Saved" });
        state.clear(senderPsid);
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

      // Show started message
      case "<SHOW_MENU>":
        response = showMenu(senderPsid);
        break;

      default:
        response = {
          text: `I don't understand quick reply "${payload}" yet.`
        };
        break;
    }
  } catch (err) {
    console.error(err);
  }

  // Send the response message
  callSendAPI(senderPsid, await response);
};

module.exports = handlePostback;
