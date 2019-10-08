const mongoose = require("mongoose");
const express = require("express");
const body_parser = require("body-parser");
const app = express().use(body_parser.json()); // creates express http server
app.set("view engine", "ejs");
app.use("/public", express.static("public"));
const {
  addGetStartedButton,
  addPersistentMenu
} = require("./helpers/requests");

// Import routes
const routerMessages = require("./routes/routeMessages");
const routerWebview = require("./routes/routeWebview");

// Import variables from .env
require("dotenv").config();
const CONNECT_DB = process.env.CONNECT_DB;

// Sets server port and logs message on success
const server = app.listen(process.env.PORT || 1337, () =>
  console.log(`webhook is listening port ${server.address().port}`)
);

// addGetStartedButton();
// addPersistentMenu();

// Routes
app.use("/api/messages", routerMessages);
app.use("/webview", routerWebview);

// Connect DB
mongoose.connect(
  process.env.CONNECT_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);
