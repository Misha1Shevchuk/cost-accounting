const { getHistory, getHistoryWithDate } = require("../services/history");
const { deleteCost } = require("../services/cost");

const showPage = async (req, res) => {
  let senderPsid = req.params.senderPsid;
  if (req.query.date) {
    let dateArr = req.query.date.split("-");
    let date = new Date();
    date.setFullYear(dateArr[0]);
    date.setMonth(dateArr[1] - 1);
    date.setDate(dateArr[2]);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    data = {
      history: await getHistoryWithDate(senderPsid, date),
      date: req.query.date
    };
  } else {
    data = {
      history: await getHistory(senderPsid),
      date: "0000-00-00"
    };
  }
  res.render("history", data);
};

const deleteRecord = async (req, res) => {
  const costId = req.body.itemId;
  try {
    let cost = await deleteCost(costId);
    if (cost) res.sendStatus(200);
    else res.status(500).json({ Error: "File already deleted" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { showPage, deleteRecord };
