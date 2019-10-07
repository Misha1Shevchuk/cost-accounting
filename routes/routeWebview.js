const router = require("express").Router();
const controller = require("../controllers/controllerWebView");

// Show history page
router.get("/:sender_psid", controller.showPageHistory);

// Show history page with any day
router.get("/:sender_psid/:date", controller.showPageHistoryWithDate);

// Delete record from history
router.delete("/", controller.deleteRecord);

module.exports = router;
