const router = require("express").Router();
const ctr = require("./controller");

// Accepts POST requests
router.post("/", ctr.newMessage);
// Accepts GET requests
router.get("/", ctr.get);

module.exports = router;
