var express = require("express");
var router = express.Router();
const usersRouter = require("./user/index");

router.use("/user/", usersRouter);

module.exports = router;
