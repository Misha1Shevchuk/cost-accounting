const router = require("express").Router();
const controller = require("../controllers/controller");

// Accepts POST requests
router.post("/", controller.newMessage);
// Accepts GET requests
router.get("/", controller.get);

module.exports = router;
