"use strict";

const express = require("express");
const { search } = require("./handler");

// App
const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", [router]);

// Constants
const PORT = 4400;
const HOST = "localhost";

const testFilters = {
  pageNumber: 1,
  pageSize: 10,
  from: 1000,
  to: 1500,
  region: "Asia",
  sort: {
    name: "desc",
  },
};

app.get("/test", async (req, res) => {
  const results = await search(testFilters);
  res.json(results);
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

module.exports = app;
