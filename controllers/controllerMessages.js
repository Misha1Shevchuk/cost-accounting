const handleMessage = require("../handlers/handleMessage");
const handlePostback = require("../handlers/handlePostback");
const handleQuickReply = require("../handlers/handleQuickReply");
const callSendAPI = require("./callSendAPI");
const { addSenderAction, addUrlToWhiteList } = require("../helpers/requests");
const SERVER_URL = process.env.SERVER_URL;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

module.exports.newMessage = (req, res) => {
  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === "page") {
    body.entry.forEach(async entry => {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      addSenderAction(sender_psid, PAGE_ACCESS_TOKEN);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      } else if (webhook_event.message.quick_reply) {
        handleQuickReply(sender_psid, webhook_event.message.quick_reply);
      } else if (webhook_event.message.text) {
        handleMessage(sender_psid, webhook_event.message.text);
      } else {
        callSendAPI(sender_psid, { text: "Sorry, I don't understand it yet" });
      }
    });
    // Return a '200 OK' response to all events
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(200);
  }
};

module.exports.get = (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");

      addUrlToWhiteList(SERVER_URL, PAGE_ACCESS_TOKEN);
      res.status(200).send(challenge);
    } else {
      res.status(200).json({ error: "Webhook isn't verified" });
    }
  }
};
