const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const db = require("../db");
const sendNotification = require("../libs/notifications");

// get all news
router.get("/", auth, function(req, res) {
  const news = db
    .get("news")
    .orderBy(["date"], ["desc"])
    .value();
  return res.json({ success: true, news });
});

// post a news
router.post("/", auth, function(req, res) {
  const post = req.body;
  post.from = req.user.name || req.user.email;
  post.date = Date.now();
  const newPost = db
    .get("news")
    .push(post)
    .write();

  sendNotification(`${post.title} (${post.from})`, "", post.content);

  return res.json({ success: true, post: newPost });
});

module.exports = router;
