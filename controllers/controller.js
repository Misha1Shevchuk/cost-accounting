const handleMessage = require("../handlers/handleMessage");
const handlePostback = require("../handlers/handlePostback");
const handleQuickReply = require("../handlers/handleQuickReply");
const callSendAPI = require("../controllers/callSendAPI");
const { addSenderAction } = require("../helpers/requests");
require("dotenv").config();

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
      addSenderAction(sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      } else if (webhook_event.message.quick_reply) {
        handleQuickReply(sender_psid, webhook_event.message.quick_reply);
      } else if (webhook_event.message.text) {
        handleMessage(sender_psid, webhook_event.message.text);
      } else {
        callSendAPI(sender_psid, { text: "I dont understand it yet" });
        callSendAPI(sender_psid, {
          attachment: {
            type: "template",
            payload: {
              template_type: "button",
              text: "What do you want to do?",
              buttons: [
                {
                  type: "postback",
                  title: "New cost",
                  payload: "<ADD_COSTS>"
                },
                {
                  type: "postback",
                  title: "Show statistic",
                  payload: "<SHOW_STATISTIC>"
                }
              ]
            }
          }
        });
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
      res.status(200).send(challenge);
    } else {
      res.sendStatus(200);
    }
  }
};
