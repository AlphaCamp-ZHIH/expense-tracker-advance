module.exports.calculateTotalMount = (arr) => {
  // console.log(arr)
  return arr.reduce((a, b) => a + b.amount, 0);
};
module.exports.whichCategory = (category) => {
  if (category === "home") return { isHome: true };
  if (category === "traffic") return { isTraffic: true };
  if (category === "entertainment") return { isEntertainment: true };
  if (category === "food") return { isFood: true };
  if (category === "other") return { isOther: true };
};
module.exports.category_cht = {
  home:"家居物業",
  traffic:"交通出行",
  entertainment:"休閒娛樂",
  food:"餐飲食品",
  other:"其他"
};
module.exports.randomNum = (length) => {
  return Math.floor(Math.random() * length)
};
module.exports.filterDate = (expenses) =>{
 return  expenses.map(expense => {
    return expense.date.split('-').slice(0, 2).join("-")
  }).filter((date, i, arr) => arr.indexOf(date) === i)
}