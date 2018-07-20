const express = require("express");
const router = express.Router();

// import routes
const authentication = require("./authentication");
const door = require("./door");

// attach routes
router.use("/auth", authentication);
router.use("/door", door);

module.exports = router;
