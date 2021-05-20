const express = require("express");
const Record = require("../../models/record");
const calculateTotalMount = require("../../helper/helper").calculateTotalMount;
const router = express.Router();

router.get("/", (req, res) => {
  Record.find()
    .sort({ date: 'asc' })
    .lean()
    .then((expenses) => {
      const totalAmount = calculateTotalMount(expenses);
      res.render("index", { expenses, totalAmount, title: "家庭記帳本" });
    });
});

module.exports = router;
