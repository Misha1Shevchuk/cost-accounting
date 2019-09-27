const checkMessage = (received_message, userData) => {
  let response;
  // console.log(userData);
  switch (received_message.text) {
    case "hello":
      response = {
        text: `Hello, ${userData.first_name}!`,
        quick_replies: [
          {
            content_type: "text",
            title: "Add costs",
            payload: "<POSTBACK_PAYLOAD>"
          },
          {
            content_type: "text",
            title: "Show statistic",
            payload: "<POSTBACK_PAYLOAD>"
          }
        ]
      };
      break;
    case "Add costs":
      response = {
        text: "Select category:",
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
      break;
    case "transport":
      response = { text: `Enter your cost:` };
      break;
    case "enterteinmant":
      response = { text: `Enter your cost:` };
      break;
    case "clothes":
      response = { text: `Enter your cost:` };
      break;
    case "food":
      response = { text: `Enter your cost:` };
      break;
    case "100":
      response = {
        text: `Select action`,
        quick_replies: [
          {
            content_type: "text",
            title: "Add costs",
            payload: "<POSTBACK_PAYLOAD>"
          },
          {
            content_type: "text",
            title: "Show statistic",
            payload: "<POSTBACK_PAYLOAD>"
          }
        ]
      };
      break;
    default:
      response = { text: `You sent the message: "${received_message.text}".` };
  }
  return response;
};

module.exports = { checkMessage };

const user = {
  _id: "user_id",
  userName: "first_name last_name",
  categories: [
    {
      food: [
        {
          date: "date",
          amount: 123
        },
        {
          date: "date",
          amount: 213
        }
      ],
      other: [
        {
          date: "date",
          amount: 123
        },
        {
          date: "date",
          amount: 213
        }
      ]
    }
  ]
};
