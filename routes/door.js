const auth = require("../middleware/auth");

const rpi = require("../libs/rpi");

const express = require("express");
const router = express.Router();

// get a pair code by email
router.get("/open/:time?", auth, function(req, res) {
  const time = parseInt(req.params.time || 60000, 10);
  rpi.openDoor(time);
  res.json({ success: true, message: `door opening for ${time} miliseconds` });
});

module.exports = router;
