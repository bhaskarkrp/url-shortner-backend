const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const dotenv = require("dotenv");
require("dotenv").config();
const app = express();
// const url = "mongodb://127.0.0.1:27017/url-shortner";
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 9000;
app.use(cors());

mongoose.connect(process.env.URL);

const conn = mongoose.connection;

conn.on("open", () => {
  console.log("Connection established with mongodb");
});

const url_short = require("./controllers/url.controller");
app.use("/post", url_short);

app.listen(port, (error) => {
  if (error) {
    console.log("Connection error: ", error.message);
  } else {
    console.log("Listning to PORT ", port);
  }
});
