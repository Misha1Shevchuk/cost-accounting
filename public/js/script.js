function deleteItem(object) {
  sendIdItem(object.id.slice(4));
}

function sendIdItem(itemId) {
  fetch("https://08140a7d.ngrok.io/webview", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId: itemId })
  }).then(function(res) {
    if (res.ok) hideDeletedElement(itemId);
  });
}

function hideDeletedElement(itemId) {
  document.getElementById("li_" + itemId).style.display = "none";
}
