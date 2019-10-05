const cost = require("../services/cost");

let responseText = "";

const day = async sender_psid => {
  var now = new Date();
  var currentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let statisticDay = toStatisticModel(
    await cost.getStatistic(sender_psid, currentDay)
  );
  responseText = toFormStatisticMessage(statisticDay, "today");
  return responseText;
};

const week = async sender_psid => {
  var now = new Date();
  var dateOfStartWeek = new Date();
  dateOfStartWeek.setDate(now.getDate() - now.getDay());
  let statisticWeek = toStatisticModel(
    await cost.getStatistic(sender_psid, dateOfStartWeek)
  );
  responseText = toFormStatisticMessage(statisticWeek, "this week");
  return responseText;
};

const month = async sender_psid => {
  var now = new Date();
  var currentMonth = new Date(now.getFullYear(), now.getMonth());
  let statisticMonth = toStatisticModel(
    await cost.getStatistic(sender_psid, currentMonth)
  );
  responseText = toFormStatisticMessage(statisticMonth, "this month");
  return responseText;
};

const allTime = async sender_psid => {
  var date = new Date(1970);
  let statisticMonth = toStatisticModel(
    await cost.getStatistic(sender_psid, date)
  );
  responseText = toFormStatisticMessage(statisticMonth, "all time");
  return responseText;
};

const toFormStatisticMessage = (statistic, periodOfTime) => {
  if (statistic.total_spends === 0 && statistic.earning === 0) {
    responseText = "First add any expend or income";
  } else {
    responseText = `statistic for ${periodOfTime}:`;
    statistic.spends.forEach(spend => {
      responseText += "\n" + spend.category + ": " + spend.sum;
    });
    responseText += "\ntotal: " + statistic.total_spends;
    if (statistic.earning) responseText += "\n\nearning: " + statistic.earning;
  }
  return responseText;
};

const toStatisticModel = costs => {
  let statisticModel = {
    spends: [],
    total_spends: null,
    earning: null
  };

  costs.forEach(cost => {
    if (cost._id === "income") {
      statisticModel.earning = cost.sum;
    } else {
      statisticModel.spends.push({ category: cost._id, sum: cost.sum });
      statisticModel.total_spends += cost.sum;
    }
  });
  return statisticModel;
};

module.exports = { day, month, week, allTime };
