const {
  getStatisticDay,
  getStatisticWeek,
  getStatisticMonth
} = require("../services/cost");

const statisticDay = async sender_psid => {
  let responseText = `*statistic for today:*`;
  (await getStatisticDay(sender_psid)).forEach(category => {
    responseText += "\n" + category._id + ": " + category.sum;
  });
  return responseText;
};

const statisticWeek = async sender_psid => {
  responseText = `*statistic for this week:*`;
  (await getStatisticWeek(sender_psid)).forEach(category => {
    responseText += "\n" + category._id + ": " + category.sum;
  });
  return responseText;
};

const statisticMonth = async sender_psid => {
  responseText = `*statistic for this month:*`;
  (await getStatisticMonth(sender_psid)).forEach(category => {
    responseText += "\n" + category._id + ": " + category.sum;
  });
  return responseText;
};

module.exports = { statisticDay, statisticMonth, statisticWeek };
