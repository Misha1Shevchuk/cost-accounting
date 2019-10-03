const { getHistory } = require("../services/history");

const history = async sender_psid => {
  let costs = [];
  (await getHistory(sender_psid)).forEach(cost => {
    costs.push(
      cost.description === "skipped"
        ? `${cost.amount}, category - ${
            cost.category
          } ${cost.date.getDate()}.${cost.date.getMonth() +
            1}.${cost.date.getFullYear()}`
        : `${cost.description}: ${cost.amount}, category - ${
            cost.category
          }  ${cost.date.getDate()}.${cost.date.getMonth() +
            1}.${cost.date.getFullYear()}`

      // {
      //   title: cost.amount + " - " + cost.category,
      //   subtitle:
      //     cost.description !== "skipped"
      //       ? cost.description +
      //         " - " +
      //         `${cost.date.getDate()}.${cost.date.getMonth() +
      //           1}.${cost.date.getFullYear()}`
      //       : "" +
      //         `${cost.date.getDate()}.${cost.date.getMonth() +
      //           1}.${cost.date.getFullYear()}`,
      //   buttons: [
      //     {
      //       type: "postback",
      //       title: "remove",
      //       payload: "<REMOVE>"
      //     }
      //   ]
      // }
    );
  });
  return costs;
};

module.exports = { history };
