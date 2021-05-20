const express = require("express");
const Record = require("../../models/record");
const Category = require("../../models/category.json");
const router = express.Router();
const whichCategory = require("../../helper/helper").whichCategory;
const calculateTotalMount = require("../../helper/helper").calculateTotalMount;
const category_cht = require("../../helper/helper").category_cht;
const filterDate = require("../../helper/helper").filterDate;

//filter
router.get("/filter", (req, res) => {
  const category = req.query.category;
  const ym = req.query.ym;
  if (category && !ym) {
    return Record.find({ category })
      .sort({ date: "asc" })
      .lean()
      .then((expenses) => {
        const totalAmount = calculateTotalMount(expenses);
        res.render("index", {
          expenses,
          totalAmount,
          category_cht: category_cht[category],
          title:category_cht[category],
        });
      });
  }
  if (ym && !category) {
    return Record.find()
      .sort({ date: "asc" })
      .lean()
      .then((expenses) => {
        expenses = expenses.filter((expense) => {
          return expense.date.includes(ym);
        });
        res.render("index", { expenses, ym ,title:ym});
      });
  }
  if (ym && category) {
    return Record.find({ category })
      .sort({ date: "asc" })
      .lean()
      .then((expenses) => {
        expenses = expenses.filter((expense) => {
          return expense.date.includes(ym);
        });
        res.render("index", {
          expenses,
          ym,
          title: ym + "-" + category_cht[category],
        });
      });
  }
});

//編輯支出
router.get("/:id/edit", (req, res) => {
  const expenseId = req.params.id;
  Record.findById(expenseId)
    .lean()
    .then((expense) => {
      res.render("edit", { expense, ...whichCategory(expense.category),title:"編輯支出" });
    });
});

router.put("/:id", (req, res) => {
  const expenseId = req.params.id;
  const { name, category, amount, date, merchant } = req.body;
  if (!name || !category || !amount || !date) {
    return res.render("edit", {
      expense: req.body,
      ...whichCategory(category),
      wrongMsg: "請填寫必填欄位",
    });
  }

  Record.findById(expenseId)
    .then((expense) => {
      const props = Object.keys(req.body);
      props.map((prop) => (expense[prop] = req.body[prop]));
      expense.categoryIcon = Category[category].icon;
      return expense.save();
    })
    .then(() => res.redirect("/"))
    .catch((e) => console.log(e));
});

// 新增支出
router.get("/new", (req, res) => {
  res.render("new", { title: "新增支出" });
});

router.post("/", (req, res) => {
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
  })
    .then(() => res.redirect("/"))
    .catch((e) => console.log(e));
});
// 刪除支出
router.delete("/:id", (req, res) => {
  const expenseId = req.params.id;
  Record.findById(expenseId)
    .then((expense) => {
      return expense.remove();
    })
    .then(() => res.redirect("/"));
});

module.exports = router;
