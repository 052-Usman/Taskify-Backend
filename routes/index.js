var express = require("express");
var router = express.Router();
const apisRouter = require("../api/index");

router.use("/api/", apisRouter);

module.exports = router;
