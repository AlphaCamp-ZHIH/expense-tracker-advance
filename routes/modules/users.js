const express = require("express");
const passport = require("passport");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.get("/login", (req, res) => res.render("login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  }),
  (req, res) => {}
);

router.get("/register", (req, res) => res.render("register"));

router.post("/register", (req, res) => {
  const errors = [];
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    return res.render("register", {
      user: req.body,
      warning_msg: "所有項目皆必填",
    });
  }
  if (password !== confirmPassword) {
    return res.render("register", {
      user: req.body,
      warning_msg: "密碼與確認密碼不一致",
    });
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.render("register", {
        user: req.body,
        warning_msg: "此帳號已存在",
      });
    }
    return bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) => {
        User.create({
          name,
          email,
          password: hash,
        });
      })
      .then(() => res.redirect("/users/login"))
      .catch((e) => console.log(e));
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash('success_msg', "已成功登出")
  res.redirect("/users/login");
});

module.exports = router;
