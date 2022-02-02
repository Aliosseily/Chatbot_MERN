const express = require("express");
const router = express.Router();
const { Jobs } = require("../models/jobs");

router.get("/", async (req, res) => {
  try {
    const jobsCount = await Jobs.countDocuments();
    const limit = 4;
    const page = +req.query.page;
    const startIndex = (page - 1) * limit;
    // const endIndex = page * limit
    // const results = {};
    // if (endIndex < jobsCount) {
    //   results.next = {
    //     page: page + 1,
    //     limit: limit
    //   }
    // }

    // if (startIndex > 0) {
    //   results.previous = {
    //     page: page - 1,
    //     limit: limit
    //   }
    // }
   //https://github.com/WebDevSimplified/Paginated-API-Express/blob/master/server.js
    let jobsList;
    const sortBy = req.query.sort;
    var regex = new RegExp(req.query.search, 'i');
    if (req.query.status === "all" && req.query.type === "all") {

      jobsList = await Jobs.find({position:regex})
        .limit(limit)
        .skip(startIndex)
        .sort(
          sortBy === "a-z"
            ? { position: 1 }
            : sortBy === "z-a"
            ? { position: -1 }
            : sortBy === "latest"
            ? { date: -1 }
            : sortBy === "oldest"
            ? { date: 1 }
            : null
        )
    } else if (req.query.status !== "all" && req.query.type !== "all") {
      jobsList = await Jobs.find({
        status: req.query.status,
        type: req.query.type,
        position:regex
      })
        .limit(limit)
        .skip(startIndex)
        .sort(
          sortBy === "a-z"
            ? { position: 1 }
            : sortBy === "z-a"
            ? { position: -1 }
            : sortBy === "latest"
            ? { date: -1 }
            : sortBy === "oldest"
            ? { date: 1 }
            : null
        );
    } else if (req.query.status === "all" && req.query.type !== "all") {
      jobsList = await Jobs.find({
        type: req.query.type,
        position:regex
      })
        .limit(limit)
        .skip(startIndex)
        .sort(
          sortBy === "a-z"
            ? { position: 1 }
            : sortBy === "z-a"
            ? { position: -1 }
            : sortBy === "latest"
            ? { date: -1 }
            : sortBy === "oldest"
            ? { date: 1 }
            : null
        );
    } else if (req.query.status !== "all" && req.query.type === "all") {
      jobsList = await Jobs.find({
        status: req.query.status,
        position:regex
      })
        .limit(limit)
        .skip(startIndex)
        .sort(
          sortBy === "a-z"
            ? { position: 1 }
            : sortBy === "z-a"
            ? { position: -1 }
            : sortBy === "latest"
            ? { date: -1 }
            : sortBy === "oldest"
            ? { date: 1 }
            : null
        );
    }
    const pages = Math.ceil(jobsCount / limit);
    if (!jobsList) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot load jobs" });
    }
    return res
      .status(200)
      .json({ success: true, data: jobsList, pages: pages });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

module.exports = router;
