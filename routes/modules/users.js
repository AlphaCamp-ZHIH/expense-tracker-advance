const express = require("express");
const passport = require('passport');
const router = express.Router();

router.get("/login" ,(req, res) => {});

router.post("/login",passport.authenticate('local',{successRedirect:'/',failureRedirect:'/users/login'}), (req, res) => {});

router.get("/register", (req, res) => {});

router.post("/register", (req, res) => {});

module.exports = router;
