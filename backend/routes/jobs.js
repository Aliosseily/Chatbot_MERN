const express = require("express");
const router = express.Router();
const { Jobs } = require("../models/jobs");

router.get("/", async (req, res) => {
  try {
    const jobsList = await Jobs.find();
    if (!jobsList) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot load jobs" });
    }
    return res.status(200).json({ success: true, data: jobsList });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});


module.exports = router;
