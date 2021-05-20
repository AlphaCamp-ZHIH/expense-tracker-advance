const Category = require('../category');
const db = require("../../config/mongoose");

const type = [
  {name: "traffic", icon: "fa-shuttle-van" },
   {name:"entertainment", icon: "fa-grin-beam"},
   {name:"home", icon: "fa-home"},
   {name:"food", icon: "fa-utensils"},
   {name:"other", icon: "fa-pen"},
];

db.once('open', () =>{
  const data = type.map( item => {
    return Category.create(item)
  });


  Promise.all(data)
  .then(()=> {
    console.log('generate category seed successfully');
    process.exit();
  })
  .catch(e => console.log(e))
})

