"use strict";

const express = require("express");

// App
const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", [router]);

// Constants
const PORT = 4400;
const HOST = "localhost";

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

module.exports = app;
