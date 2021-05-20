const express = require("express");
const home = require('./modules/home');
const records = require('./modules/records');
const users = require('./modules/users');

const router = express.Router();

router.use('/users',users);
router.use('/records',records);
router.use('/',home)

module.exports= router