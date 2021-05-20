const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const record = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  categoryIcon: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  merchant: {
    type: String,
  },
});

module.exports = mongoose.model("Record", record);
