function deleteItem(object) {
  sendIdItem(object.id.slice(4));
}

function sendIdItem(itemId) {
  fetch("/webview", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId: itemId })
  }).then(function(res) {
    if (res.ok) hideDeletedElement(itemId);
  });
}

function searchDate() {
  var userId = window.location.pathname.replace("/webview/", "");
  fetch("/webview/" + userId, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
}

function hideDeletedElement(itemId) {
  document.getElementById("li_" + itemId).style.display = "none";
}
