const mongoose = require("mongoose");

const jobsSchema = mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type:Date,
    default:Date.now
  },
});

exports.Jobs = mongoose.model("Jobs", jobsSchema);
