const express = require("express");
const router = express.Router();
const { Jobs } = require("../models/jobs");

// router.get("/", async (req, res) => {
//   const query = req.query.status;
//   console.log("QUERY", query);
//   try {
//     let jobsList;
//     if(req.query.status === "all" && req.query.type ==="all"){
//       jobsList = await Jobs.find();
//     }
//     else{
//       jobsList = await Jobs.find({ status: req.query.status, type: req.query.type});
//     }
//     if (!jobsList) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Cannot load jobs" });
//     }
//     return res.status(200).json({ success: true, data: jobsList });
//   } catch ({ message }) {
//     return res.status(500).json({ success: false, message: message });
//   }
// });

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

    let jobsList;
    const sortBy = req.query.sort;
    if (req.query.status === "all" && req.query.type === "all") {

      jobsList = await Jobs.find()
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
