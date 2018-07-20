let config = {
  port: 5050,
  env: "development",
  secret: "ABigSecretPassphraseForJWT",
  mail: {
    user: "",
    password: ""
  }
};

if (process.env.NODE_ENV === "production") {
  config.port = 8080;
  config.env = "production";
}

module.exports = config;
