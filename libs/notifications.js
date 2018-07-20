var request = require("request");

var sendMessage = function(title, subtitle, message) {
  var restKey = "ZGIwMzY4YzItY2I4Ny00MzFhLWFlZTYtNDgxYmIzMmJlYjIy";
  var appID = "6cc2c11d-5ff4-4ca9-832d-6dedbc05cc0d";
  request(
    {
      method: "POST",
      uri: "https://onesignal.com/api/v1/notifications",
      headers: {
        authorization: "Basic " + restKey,
        "content-type": "application/json"
      },
      json: true,
      body: {
        app_id: appID,
        contents: { en: message },
        headings: { en: title },
        subtitle: { en: subtitle },
        url: "https://fifty-three.surge.sh/board",
        included_segments: ["Subscribed Users"]
      }
    },
    function(error, response, body) {
      if (body.errors) console.error("Error:", body.errors);
    }
  );
};

// Also accepts an array of devices
module.exports = sendMessage;
