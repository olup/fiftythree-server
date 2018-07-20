const express = require("express");
const router = express.Router();

// import routes
const authentication = require("./authentication");
const door = require("./door");
const news = require("./news");

// attach routes
router.use("/auth", authentication);
router.use("/door", door);
router.use("/news", news);

module.exports = router;
