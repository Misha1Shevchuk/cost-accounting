const checkMessage = (received_message, userData) => {
  let message;
  // console.log(userData);
  switch (received_message.text) {
    case "hello":
      message = `Hello, ${userData.first_name}!`;
      break;

    default:
      message = `You sent the message: "${received_message.text}". Now send me an attachment!`;
  }
  return message;
};

module.exports = checkMessage;
