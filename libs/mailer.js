const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.mail.user,
    pass: config.mail.password
  }
});

const mailer = {
  send: (to, subject, html) =>
    new Promise((res, rej) => {
      const mailOptions = {
        to,
        subject,
        html
      };
      transporter.sendMail(mailOptions, function(err, info) {
        if (err) rej(err);
        else res(info);
      });
    })
};

module.exports = mailer;
