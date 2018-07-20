const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");

const mailer = require("../libs/mailer");
const db = require("../db");

// get a pair code by email
router.post("/request", async (req, res) => {
  const email = req.body.email;
  const user = db
    .get("users")
    .find({ email })
    .value();

  // no user ?
  if (!user)
    return res.json({
      success: false,
      message: "Unregistered e-mail. Please contact your administrator"
    });

  // Generating random four digit code
  const pairCode = Math.floor(1000 + Math.random() * 9000);

  // user is here, let's give him a code
  db.get("users")
    .find({ email })
    .assign({ pairCode })
    .write();

  try {
    // then send the code by email
    await mailer.send(
      email,
      "Your 53 pairing code",
      `Hi !
You are trying to pair a new device with your 53 account. No problem !
Use this code in the app to finish pairing : ${pairCode}

Have a good 53 !`
    );
  } catch (err) {
    console.log("Email could not be send :");
    console.log(err);
  }

  console.log(`Generated code : ${pairCode} fro user ${email}`);

  res.json({ success: true, message: "An email has been sent" });
});

// get pairing token from email and pair code (transform to int)
router.post("/pair", (req, res) => {
  const pairCode = parseInt(req.body.pairCode, 10);
  const email = req.body.email;

  // no pair code ?
  if (!pairCode || !email)
    return res.json({
      success: false,
      message: "Email or pair code missing"
    });

  // If a pair code is provided,
  const user = db
    .get("users")
    .find({ email, pairCode })
    .value();

  // no user ?
  if (!user)
    return res.json({
      success: false,
      message: "Email or pair code incorrect"
    });

  const token = jwt.sign({ ...user }, config.secret, {
    expiresIn: 60 * 24 * 60 * 60 * 1000 // expires in 60 days
  });

  db.get("users")
    .find({ email, pairCode })
    .assign({ pairCode: null })
    .write();

  return res.json({ success: true, token });
});

module.exports = router;
