const express = require("express");
const router = express.Router();
const { Intent } = require("../models/intent");

router.get("/", async (req, res) => {
  try {
    const intentsList = await Intent.find();
    if (!intentsList) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot load intents" });
    }
    return res.status(200).send({ success: true, data: intentsList });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

router.post("/getresponse", async (req, res) => {
  try {
    const response = await Intent.find(
      { request: req.body.request },
      { _id: 0, request: 1, response: 1 }
    );
    const result =
      response.length > 0
        ? { success: true, data: response }
        : {
            success: true,
            data: [
              { request: req.body.request, response: "please try again!" },
            ],
          };
    res.status(200).json(result);
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

router.post("/", async (req, res) => {
  try {
    let intent = new Intent({
      request: req.body.request,
      response: req.body.response,
    });
    intent = await intent.save();
    if (!intent) {
      return res.status(404).send("Intent cannot be created!");
    }
    return res.status(200).send({ success: true, data: intent });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedIntent = await Intent.findByIdAndRemove(req.params.id);
    if (!deletedIntent) {
      return res
        .status(404)
        .json({ success: false, message: "Intent not found!" });
    }
    return res.status(200).json({ success: true, data: deletedIntent });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

module.exports = router;
