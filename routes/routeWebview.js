const router = require("express").Router();
const controller = require("../controllers/controllerWebView");

// Show history page
router.get("/:senderPsid", controller.showPageHistory);

// Show history page with any day
router.get("/:senderPsid/:date", controller.showPageHistoryWithDate);

// Delete record from history
router.delete("/", controller.deleteRecord);

module.exports = router;
