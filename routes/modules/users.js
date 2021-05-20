const express = require("express");
const passport = require('passport');
const User =require('../../models/user');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.get("/login" ,(req, res) => res.render('login'));

router.post("/login",passport.authenticate('local',{successRedirect:'/',failureRedirect:'/users/login'}), (req, res) => {});

router.get("/register", (req, res) =>res.render('register'));

router.post("/register", (req, res) => {
  console.log(req.body)
  const {name, email, password, confirmPassword} = req.body;
  User.findOne({email})
  .then(user =>{
    console.log(user)
    if(user){
      return res.render('register',{user:req.body,warning_msg:"此帳號已存在"});
    }
    return bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(password,salt))
    .then(hash =>{
      User.create({
        name,
        email,
        password:hash
      })
    })
    .then(() => res.redirect('/users/login'))
    .catch(e => console.log(e));

  });

});

router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/users/login');
})

module.exports = router;
