const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const body_parser = require("body-parser");
const app = express().use(body_parser.json()); // creates express http server
const route = require("./routes/messages");
const {
  addGetStartedButton,
  addPersistentMenu
} = require("./helpers/requests");
app.set("view engine", "ejs");
app.use("/public", express.static("public"));
const { getHistory } = require("./services/history");

// Sets server port and logs message on success
const server = app.listen(process.env.PORT || 1337, () =>
  console.log(`webhook is listening port ${server.address().port}`)
);

// addGetStartedButton();
// addPersistentMenu();

// Routes
app.use("/api/messages", route); // Route
app.use("/webview", async (req, res) => {
  res.render("history", { data: await getHistory("2439638436121964") });
});

// Connect DB
mongoose.connect(
  process.env.CONNECT_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);
