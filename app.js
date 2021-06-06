const express = require("express");
const exphbs = require("express-handlebars");
const router = require("./routes/index");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const usePassport = require("./config/passport");
const Record = require("./models/record");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

require("./config/mongoose");
const filterDate = require("./helper/helper").filterDate;
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

app.use(flash());

app.use(
  session({
    secret: "mysecret",
    saveUninitialized: true,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
usePassport();

app.use((req, res, next) => {
  const category = req.query.category;
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  const months = Array.from({ length: 12 }).map((month, i) => ({
    month: i + 1,
    category,
  }));

  res.locals.months = months;
  return next();
});

app.use(router);

app.listen(port, () =>
  console.log(`operate sever http://localhost/${port} successfully`)
);
