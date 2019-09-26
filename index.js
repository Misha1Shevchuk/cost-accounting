"use strict";

// Imports dependencies and set up http server
const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const body_parser = require("body-parser");
const app = express().use(body_parser.json()); // creates express http server
const route = require("./route");

// Sets server port and logs message on success
const server = app.listen(process.env.PORT || 1337, () =>
  console.log(`webhook is listening port ${server.address().port}`)
);

app.use("/api/m", route); // Route

// Connect DB
mongoose.connect(
  process.env.CONNECT_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);
