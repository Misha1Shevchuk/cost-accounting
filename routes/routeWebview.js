const router = require("express").Router();
const { getHistory } = require("../services/history");
const { deleteCost } = require("../services/cost");

router.get("/:sender_psid", async (req, res) => {
  res.render("history", { data: await getHistory(req.params.sender_psid) });
});

router.delete("/", async (req, res) => {
  const costId = req.body.itemId;
  try {
    let cost = await deleteCost(costId);
    if (cost) res.sendStatus(200);
    else res.status(500).json({ Error: "File already deleted" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
