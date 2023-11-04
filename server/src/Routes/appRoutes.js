const express = require("express");
const router = express.Router();

const appController = require("../Controllers/appController.js");
const limiter = require("../Middleware/limiter");

router.route("/extract-text").post(appController.extract);

module.exports = router;