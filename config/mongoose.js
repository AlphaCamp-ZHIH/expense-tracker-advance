const mongoose = require("mongoose");
const MONGODB_URI =
  process.env.MONGODB_URI ||"mongodb://localhost/expense-tracker"
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const db = mongoose.connection;

db.on("error", (e) => {
  console.log(e);
});

db.once("open", () => console.log("mongodb connected successfully"));

module.exports = db;
