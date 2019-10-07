const { getHistory, getHistoryWithDate } = require("../services/history");
const { deleteCost } = require("../services/cost");

const showPageHistory = async (req, res) => {
  console.log(await getHistory(req.params.sender_psid));

  res.render("history", {
    data: {
      history: await getHistory(req.params.sender_psid),
      date: "0000-00-00"
    }
  });
};

const showPageHistoryWithDate = async (req, res) => {
  let dateArr = req.params.date.split("-");
  var date = new Date();
  date.setFullYear(dateArr[0]);
  date.setMonth(dateArr[1] - 1);
  date.setDate(dateArr[2]);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  res.render("history", {
    data: {
      history: await getHistoryWithDate(req.params.sender_psid, date),
      date: req.params.date
    }
  });
};

const deleteRecord = async (req, res) => {
  const costId = req.body.itemId;
  try {
    let cost = await deleteCost(costId);
    if (cost) res.sendStatus(200);
    else res.status(500).json({ Error: "File already deleted" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { showPageHistory, showPageHistoryWithDate, deleteRecord };
