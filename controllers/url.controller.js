const express = require("express");
const url_short = express.Router();
const URLDATA = require("../models/url.model");
const shortid = require("shortid");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let count = 0;

url_short.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const body = {
      originalUrl: req.body.originalUrl,
      shortUrl: shortid.generate(),
      counts: count,
    };
    // console.log(body);
    const one_url = await URLDATA.create(body);
    res.status(200).json(one_url);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

url_short.get("/", async (req, res) => {
  try {
    const find_urls = await URLDATA.find();

    res.status(200).json(find_urls);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

url_short.get("/:url", async (req, res) => {
  try {
    const find_url = await URLDATA.findOne({ shortUrl: req.params.url });
    const count_url = find_url.counts + 1;
    // console.log(find_url, count_url, req.params.url);
    await URLDATA.updateOne(find_url, { $set: { counts: count_url } });
    res.status(200).json(find_url);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

url_short.delete("/:url", async (req, res) => {
  try {
    // console.log(req.params);
    const deletedUrl = await URLDATA.findOneAndDelete({
      shortUrl: req.params.url,
    });
    // console.log(deletedUrl);
    res.status(200).json(deletedUrl);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = url_short;
