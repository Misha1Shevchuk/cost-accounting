const formQuickReplies = (
  text = "",
  quickReplies = [{ title: "", payload: "" }]
) => {
  let array = quickReplies.map(qr => {
    return {
      content_type: "text",
      title: qr.title,
      payload: qr.payload
    };
  });
  return { text: text, quick_replies: [...array] };
};

module.exports = { formQuickReplies };
