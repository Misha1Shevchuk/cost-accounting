const checkMessage = received_message => {
  let response;
  // console.log(userData);
  switch (received_message) {
    case "hello":
      response = {
        text: `Hello!`,
        quick_replies: [
          {
            content_type: "text",
            title: "Add costs",
            payload: "<ADD_COSTS>"
          },
          {
            content_type: "text",
            title: "Show statistic",
            payload: "<SHOW_STATISTIC>"
          }
        ]
      };
      break;
    case "Add costs":
      response = {
        text: "Select category",
        quick_replies: [
          {
            content_type: "text",
            title: "transport",
            payload: "<TRANSPORT>"
          },
          {
            content_type: "text",
            title: "entertainment",
            payload: "<ENTERTAINMENT>"
          },
          {
            content_type: "text",
            title: "clothes",
            payload: "<CLOTHES>"
          },
          {
            content_type: "text",
            title: "food",
            payload: "<FOOD>"
          },
          {
            content_type: "text",
            title: "other",
            payload: "<OTHER>"
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
    default:
      response = { text: `I don't understand "${received_message.text}" yet.` };
  }
  return response;
};

module.exports = checkMessage;
