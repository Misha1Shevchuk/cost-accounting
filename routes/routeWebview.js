const router = require("express").Router();
const controller = require("../controllers/controllerWebView");

// Show history page
router.get("/:senderPsid", controller.showPage);

// // Show history page with any day
// router.get("/:senderPsid", controller.showPageHistoryWithDate);

// Delete record from history
router.delete("/", controller.deleteRecord);

module.exports = router;
