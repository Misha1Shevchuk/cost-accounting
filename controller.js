const request = require("request");
const { checkMessage, getUserData } = require("./services/messages");
const { addNewUser } = require("./services/database");
require("dotenv").config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

module.exports.newMessage = (req, res) => {
  // Parse the request body from the POST
  let body = req.body;
  console.log(body);

  // Check the webhook event is from a Page subscription
  if (body.object === "page") {
    body.entry.forEach(async entry => {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      let userData = await getUserData(sender_psid);
      console.log(userData);
      console.log("Sender ID: " + sender_psid);

      /* Add user to db */
      // addNewUser(sender_psid, userData);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message, userData);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });
    // Return a '200 OK' response to all events
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

module.exports.get = (req, res) => {
  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = "vertok";

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
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};

const handleMessage = (sender_psid, received_message, userData) => {
  let response;

  // Checks if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      // text: checkMessage(received_message, userData)

      text: "Categories:",
      quick_replies: [
        {
          content_type: "text",
          title: "transport",
          payload: "<POSTBACK_PAYLOAD>"
        },
        {
          content_type: "text",
          title: "enterteinmant",
          payload: "<POSTBACK_PAYLOAD>"
        },
        {
          content_type: "text",
          title: "clothes",
          payload: "<POSTBACK_PAYLOAD>"
        },
        {
          content_type: "text",
          title: "food",
          payload: "<POSTBACK_PAYLOAD>"
        },
        {
          content_type: "text",
          title: "other",
          payload: "<POSTBACK_PAYLOAD>"
        }
      ]
    };
  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Is this the right picture?",
              subtitle: "Tap a button to answer.",
              image_url: attachment_url,
              buttons: [
                {
                  type: "postback",
                  title: "Yes!",
                  payload: "yes"
                },
                {
                  type: "postback",
                  title: "No!",
                  payload: "no"
                }
              ]
            }
          ]
        }
      }
    };
  }
  // Send the response message
  callSendAPI(sender_psid, response);
};

const handlePostback = (sender_psid, received_postback) => {
  console.log("ok");
  let response;
  // Get the payload for the postback
  let payload = received_postback.payload;

  MessengerExtensions.askPermission(
    function(permission_response) {
      // Person grants or rejects the asked permission.
      let permissions = permission_response.permissions; // list of all permissions granted
      let isGranted = permission_response.isGranted;

      if (isGranted) {
        console.log(object);
      }
    },
    function(errorCode, errorMessage) {
      // Error occurred
    },
    "user_profile"
  );

  // Set the response based on the postback payload
  if (payload === "yes") {
    response = { text: "Thanks!" };
  } else if (payload === "no") {
    response = { text: "Oops, try sending another image." };
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
};

const callSendAPI = (sender_psid, response) => {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid
    },
    message: response
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message: " + err);
      }
    }
  );
};
