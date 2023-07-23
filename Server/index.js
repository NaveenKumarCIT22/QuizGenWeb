require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const app = express();

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/gsheet", (req, res) => {});

app.listen(port, () => {
  console.log("Backend initiated!");
});
