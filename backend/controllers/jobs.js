const { Job } = require("../models/jobs");

const getAllJobs = async (req, res) => {
  try {
    const jobsCount = await Job.countDocuments();
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
    var regex = new RegExp(req.query.search, "i");
    if (req.query.status === "all" && req.query.type === "all") {
      jobsList = await Job.find({ position: regex })
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
    } else if (req.query.status !== "all" && req.query.type !== "all") {
      jobsList = await Job.find({
        status: req.query.status,
        type: req.query.type,
        position: regex,
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
      jobsList = await Job.find({
        type: req.query.type,
        position: regex,
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
      jobsList = await Job.find({
        status: req.query.status,
        position: regex,
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
};

const getOneJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "job not found" });
    }
    return res.status(200).json({ success: true, data: job });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
};

const addNewJob = async (req, res) => {
  try {
    let job = new Job({
      position: req.body.position,
      company: req.body.company,
      location: req.body.location,
      status: req.body.status,
      type: req.body.type,
    });
    job = await job.save();

    if (!job) {
      return res.status(404).send("The job cannot be created!");
    }
    return res.status(200).json({ success: true, data: job });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      {
        position: req.body.position,
        company: req.body.company,
        location: req.body.location,
        status: req.body.status,
        type: req.body.type,
      },
      { new: true }
    );
    if (!updatedJob) {
      return res.status(404).send("The job cannot be updated!");
    }
    return res.status(200).json({ success: false, data: updatedJob });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndRemove(req.params.id);
    if (!deletedJob) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found!" });
    }
    return res.status(200).json({ success: true, data: deletedJob });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
};

module.exports = { getAllJobs, getOneJob, addNewJob, updateJob, deleteJob };
