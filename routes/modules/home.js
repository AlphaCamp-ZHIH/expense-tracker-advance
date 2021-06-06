const express = require("express");
const Record = require("../../models/record");
const calculateTotalMount = require("../../helper/helper").calculateTotalMount;
const dateFormChange = require("../../helper/helper").dateFormChange;
const router = express.Router();

router.get("/", (req, res) => {
  const userId = req.user._id;
  Record.find({ userId })
    .sort({ date: "asc" })
    .lean()
    .then((expenses) => {
      expenses = expenses.map((expense) => {
        expense.date = dateFormChange(expense);
        return expense;
      });
      const totalAmount = calculateTotalMount(expenses);
      res.render("index", { expenses, totalAmount, title: "家庭記帳本" });
    });
});

module.exports = router;
