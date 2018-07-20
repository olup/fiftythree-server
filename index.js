// environment config
const config = require("./config");

// express
const express = require("express");
const app = express();

// allow cors
var cors = require("cors");
app.use(
  cors({
    allowedHeaders: ["x-access-token", "content-type"]
  })
);

// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// logger
const morgan = require("morgan");
app.use(morgan("dev"));

// import all routes
const routes = require("./routes");
app.use("/", routes);

// Main test route
app.get("/", function(req, res) {
  res.json({ version: "0.1" });
});

app.listen(config.port, function() {
  console.log(`53 running in ${config.env} on port ${config.port}`);
});
