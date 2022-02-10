const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getOneJob,
  addNewJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

router.route("/").get(getAllJobs).post(addNewJob);
router.route("/:id").get(getOneJob).put(updateJob).delete(deleteJob);
// router.get("/", getAllJobs);

// router.get("/:id", getOneJob);

// router.post("/", addNewJob);

// router.put("/:id", updateJob);

// router.delete("/:id", deleteJob);

module.exports = router;
