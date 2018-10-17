const axios = require("axios");

const PersonalityInsightsV3 = require("watson-developer-cloud/personality-insights/v3");
const ToneAnalyzerV3 = require("watson-developer-cloud/tone-analyzer/v3");

module.exports.getPersonality = (req, res) => {
  var personalityInsights = new PersonalityInsightsV3({
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    version: "2017-10-13",
    url:
      "https://gateway.watsonplatform.net/personality-insights/api/v3/profile?version=2017-10-13"
  });

  personalityInsights.profile(
    {
      content: req.body.userInfo,
      content_type: "text/plain",
      consumption_preferences: true
    },
    function(err, response) {
      if (err) {
        console.log("error:", err);
      } else {
        res.send(response).status(200);
      }
    }
  );
};
