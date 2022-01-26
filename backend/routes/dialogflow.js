const express = require("express");
const router = express.Router();
const dialogflow = require("dialogflow");
const config = require("../config/keys");

const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

console.log(projectId);
console.log(sessionId);
console.log(languageCode);

// Create a new session
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// Text Query Route
router.post("/textQuery", async (req, res) => {
  //We need to send some information that comes from the client to Dialogflow API
  // The text query request.
  try {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: req.body.text,
          // The language used by the client (en-US)
          languageCode: languageCode,
        },
      },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log("Detected intent");
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    res.send(result);
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

//Event Query Route

router.post("/eventQuery", async (req, res) => {
  //We need to send some information that comes from the client to Dialogflow API
  // The text query request.
  try {
  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        // The query to send to the dialogflow agent
        name: req.body.event,
        // The language used by the client (en-US)
        languageCode: languageCode,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);

  res.send(result);
} catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

module.exports = router;
