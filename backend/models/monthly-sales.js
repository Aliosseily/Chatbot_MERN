const mongoose = require("mongoose");


const salesSchema = mongoose.Schema({
  year: {
    type: String,
    required: false,
  },
  sales: {
    type: String,
    required: false,
  },
  cost: {
    type: String,
    required: false,
  },
  profit: {
    type: String,
    required: false,
  },
  months: [
    {
      month: {
        type: String,
        required: false,
      },
      amount: {
        type: String,
        required: false,
      },
    },
  ],
});

exports.Sales = mongoose.model("Sales", salesSchema, "monthly-sales");
