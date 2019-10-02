const {
  getHistoryDay,
  getHistoryWeek,
  getHistoryMonth
} = require("../services/history");

const historyDay = async sender_psid => {
  let costs = [];
  (await getHistoryDay(sender_psid)).forEach(cost => {
    costs.push(
      cost.description === "skipped"
        ? `${cost.amount}, category - ${
            cost.category
          } ${cost.date.getDate()}.${cost.date.getMonth()}.${cost.date.getFullYear()}`
        : `${cost.description}: ${cost.amount}, category - ${
            cost.category
          }  ${cost.date.getDate()}.${cost.date.getMonth()}.${cost.date.getFullYear()}`
    );
  });
  return costs;
};

const historyWeek = async sender_psid => {
  let costs = [];
  (await getHistoryWeek(sender_psid)).forEach(cost => {
    costs.push(
      cost.description === "skipped"
        ? `${cost.amount}, category - ${
            cost.category
          } ${cost.date.getDate()}.${cost.date.getMonth()}.${cost.date.getFullYear()}`
        : `${cost.description}: ${cost.amount}, category - ${
            cost.category
          } ${cost.date.getDate()}.${cost.date.getMonth()}.${cost.date.getFullYear()}`
    );
  });
  return costs;
};

const historyMonth = async sender_psid => {
  let costs = [];
  (await getHistoryMonth(sender_psid)).forEach(cost => {
    costs.push(
      cost.description === "skipped"
        ? `${cost.amount}, category - ${
            cost.category
          } ${cost.date.getDate()}.${cost.date.getMonth()}.${cost.date.getFullYear()}`
        : `${cost.description}: ${cost.amount}, category - ${
            cost.category
          } ${cost.date.getDate()}.${cost.date.getMonth()}.${cost.date.getFullYear()}`
    );
  });
  return costs;
};

module.exports = { historyDay, historyMonth, historyWeek };
