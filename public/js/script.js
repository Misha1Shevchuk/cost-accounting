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
  var date = document.getElementById("date_selector").value;
  fetch("/webview/" + userId + "/" + date, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then(function(response) {
    window.location.href = response.url;
  });
}

function hideDeletedElement(itemId) {
  document.getElementById("li_" + itemId).style.display = "none";
}
