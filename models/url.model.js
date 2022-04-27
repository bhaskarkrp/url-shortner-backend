const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  counts: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("url", urlSchema);
