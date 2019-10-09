const cost = require("../services/cost");
const INCOME = require("./incomesEnum");

let responseText = "";

const day = async senderPsid => {
  const time = new Date();
  time.setHours(0);
  time.setMinutes(0);
  time.setSeconds(0);
  time.setMilliseconds(0);

  let statisticDay = toStatisticModel(
    await cost.getStatistic(senderPsid, time)
  );
  responseText = toFormStatisticMessage(statisticDay, "today");
  return responseText;
};

const week = async sender_psid => {
  let time = new Date();
  time.setHours(0);
  time.setMinutes(0);
  time.setSeconds(0);
  time.setMilliseconds(0);
  time.getDay() === 0
    ? time.setDate(time.getDate() - 6)
    : time.setDate(time.getDate() - time.getDay());
  let statisticWeek = toStatisticModel(
    await cost.getStatistic(sender_psid, time)
  );
  responseText = toFormStatisticMessage(statisticWeek, "this week");

  return responseText;
};

const month = async senderPsid => {
  let time = new Date();
  time.setDate(0);
  time.setHours(0);
  time.setMinutes(0);
  time.setSeconds(0);
  time.setMilliseconds(0);
  time.getDay() === 0;

  let statisticMonth = toStatisticModel(
    await cost.getStatistic(senderPsid, time)
  );
  responseText = toFormStatisticMessage(statisticMonth, "this month");
  return responseText;
};

const allTime = async senderPsid => {
  let date = new Date(1970);
  let statisticAllTime = toStatisticModel(
    await cost.getStatistic(senderPsid, date)
  );
  responseText = toFormStatisticMessage(statisticAllTime, "all time");
  return responseText;
};

const toFormStatisticMessage = (statistic, periodOfTime) => {
  if (!statistic.totalSpends && !statistic.earning) {
    responseText = "First add any expense or income";
  } else {
    responseText = `Statistic for ${periodOfTime}:`;
    // Check if statistic contains any spend
    if (statistic.totalSpends) {
      statistic.spends.forEach(spend => {
        responseText +=
          "\n" +
          spend.category +
          ": " +
          spend.sum.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
      });
      responseText +=
        "\nTotal: " +
        statistic.totalSpends
          .toFixed(2)
          .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    }
    // Check if statistic contains income
    if (statistic.earning)
      responseText +=
        "\n\n" +
        INCOME +
        ": " +
        statistic.earning
          .toFixed(2)
          .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  }
  return responseText;
};

const toStatisticModel = costs => {
  let statisticModel = {
    spends: [],
    totalSpends: null,
    earning: null
  };

  costs.forEach(cost => {
    if (cost._id === INCOME) {
      statisticModel.earning = cost.sum;
    } else {
      statisticModel.spends.push({ category: cost._id, sum: cost.sum });
      statisticModel.totalSpends += cost.sum;
    }
  });
  return statisticModel;
};

module.exports = { day, month, week, allTime };
