const Record = require("../record");
const Category = require("../category.json");
const User = require("../user");
const bcrypt = require("bcryptjs");
const db = require("../../config/mongoose");
const type = ["traffic", "entertainment", "home", "food", "other"];
const randomNum = require("../../helper/helper").randomNum;
let i =0;
// console.log(Category[type[randomNum(5)]].name)
db.once("open", async () => {
  const users = Array.from({ length: 3 }, (_, i) => {
    return bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash("12345678", salt))
      .then((hash) =>
        User.create({
          name: `name-${i}`,
          email: `example-${i}@test.com`,
          password: hash,
        })
      )
      .then((user) => {
        const userId = user._id;
        const data = Array.from({ length: 9 }, (_, i) => {
          const category = type[randomNum(5)];
          return Record.create({
            name: `name-${i}`,
            date: new Date(2021, randomNum(12)+1,randomNum(20)+1),
            category: Category[category].name,
            categoryIcon: Category[category].icon,
            amount: (i + 1) * 100,
            merchant: `你家-${i}`,
            userId,
          });
        });
        return Promise.all(data);
      })
      .then(()=>{
        ++i;
        console.log(`seed of user-${i}  finished`)
      });
  });
  await Promise.all(users);
  db.close();
  console.log('All seeds create  successfully')
});