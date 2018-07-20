const jwt = require("jsonwebtoken");
const config = require("../config");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  // No token is passed along, its not authorized
  if (!token)
    return res
      .status(403)
      .send({ success: false, message: "No token provided." });

  // If there is a token, is it valid ?
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ success: false, message: "Failed to authenticate token." });

    // if everything good, save to request for use in other routes
    req.userEmail = decoded.email;
    next();
  });
};

module.exports = verifyToken;
