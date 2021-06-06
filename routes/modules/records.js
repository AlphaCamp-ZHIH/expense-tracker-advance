const express = require("express");
const Record = require("../../models/record");
const Category = require("../../models/category.json");
const router = express.Router();
const whichCategory = require("../../helper/helper").whichCategory;
const calculateTotalMount = require("../../helper/helper").calculateTotalMount;
const category_cht = require("../../helper/helper").category_cht;
const dateFormChange = require("../../helper/helper").dateFormChange;

//filter
router.get("/filter", (req, res) => {
  const userId = req.user._id;
  const category = req.query.category;
  const month = req.query.month;
  if (month) {
    return Record.find({
      userId,
      date: { $gte: `2021-${month}-1`, $lte: `2021-${month}-31` },
    })
    .sort({ date: "asc" })
    .lean()
      .then((expenses) => {
        let totalAmount = calculateTotalMount(expenses);
        expenses.forEach((expense) => {
          expense.date = dateFormChange(expense);
        });
        if (category) {
          expenses = expenses.filter(
            (expense) => expense.category === category
          );
          totalAmount = calculateTotalMount(expenses);
          return res.render("index", {
            expenses,
            totalAmount,
            category_cht: category_cht[category],
            title: category_cht[category],
            month,
          });
        }
        return res.render("index", {
          expenses,
          totalAmount,
          category_cht: category_cht[category],
          title: category_cht[category],
          month,
        });
      })
      .catch((e) => console.log(e));
  }
  if (category) {
    return Record.find({ userId, category })
      .sort({ date: "asc" })
      .lean()
      .then((expenses) => {
        expenses.forEach((expense) => {
          expense.date = dateFormChange(expense);
        });
        res.locals.a = category;
        totalAmount = calculateTotalMount(expenses);
        return res.render("index", {
          expenses,
          totalAmount,
          category_cht: category_cht[category],
          title: category_cht[category],
          month,
        });
      })
      .catch((e) => console.log(e));
  }
});

//編輯支出
router.get("/:id/edit", (req, res) => {
  const userId = req.user._id;
  const expenseId = req.params.id;
  Record.findOne({ _id: expenseId, userId })
    .lean()
    .then((expense) => {
      expense.date = dateFormChange(expense);
      res.render("edit", {
        expense,
        ...whichCategory(expense.category),
        title: "編輯支出",
      });
    });
});

router.put("/:id", (req, res) => {
  const expenseId = req.params.id;
  const userId = req.user._id;
  const { name, category, amount, date, merchant } = req.body;
  if (!name || !category || !amount || !date) {
    return res.render("edit", {
      expense: req.body,
      ...whichCategory(category),
      wrongMsg: "請填寫必填欄位",
    });
  }
  Record.findOneAndUpdate({ _id: expenseId, userId }, req.body, { new: true })
    .then(() => res.redirect("/"))
    .catch((e) => console.log(e));
});

// 新增支出
router.get("/new", (req, res) => {
  res.render("new", { title: "新增支出" });
});

router.post("/", (req, res) => {
  const userId = req.user._id;
  const { name, category, amount, date, merchant } = req.body;
  if (!name || !category || !amount || !date) {
    return res.render("new", {
      expense: req.body,
      ...whichCategory(category),
      wrongMsg: "請填寫必填欄位",
    });
  }
  Record.create({
    name,
    amount,
    date,
    merchant,
    category: category,
    categoryIcon: Category[category].icon,
    userId,
  })
    .then(() => res.redirect("/"))
    .catch((e) => console.log(e));
});
// 刪除支出
router.delete("/:id", (req, res) => {
  const userId = req.user._id;
  const expenseId = req.params.id;
  Record.findOneAndDelete({ userId, _id: expenseId }).then(() =>
    res.redirect("/")
  );
});

module.exports = router;
