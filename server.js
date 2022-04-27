const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const url = "mongodb://127.0.0.1:27017/url-shortner";
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

mongoose.connect(url);

const conn = mongoose.connection;

conn.on("open", () => {
  console.log("Connection established with mongodb");
});

const url_short = require("./controllers/url.controller");
app.use("/post", url_short);

app.listen(9000, (error) => {
  if (error) {
    console.log("Connection error: ", error.message);
  } else {
    console.log("Listning to PORT ", 9000);
  }
});
