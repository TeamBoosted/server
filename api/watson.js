const axios = require("axios");

const PersonalityInsightsV3 = require("watson-developer-cloud/personality-insights/v3");
const ToneAnalyzerV3 = require("watson-developer-cloud/tone-analyzer/v3");

module.exports.getPersonality = (req, res) => {
  console.log("HEY I AM IN TEH WATSON SERVER\n");
  console.log("HERE IS THE WATSON REQ BODY \n", req.body);

  var personalityInsights = new PersonalityInsightsV3({
    username: "264dd11f-9485-4a1d-a4d2-10389711df8f",
    password: "DIOxnbox8KRp",
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
        console.log("success!!!");
        console.log(JSON.stringify(response, null, 2));
        res.send(response).status(200);
        // console.log(JSON.stringify(response));
      }
    }
  );
};
