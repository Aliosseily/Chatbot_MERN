const express = require("express");
const router = express.Router();
const { Sales } = require("../models/monthly-sales");

router.get("/", async (req, res) => {
  try {
    const salesList = await Sales.find();
    console.log("salesList", salesList.toString());
    if (!salesList) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot load sales" });
    }
    return res.status(200).send({ success: true, data: salesList });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const sales = await Sales.findById(req.params.id);
    if (!sales) {
      return res
        .status(404)
        .json({ success: false, message: "sales not found" });
    }

    const calculatedSales = sales.months.reduce(function (acc, obj) {
      return acc + +obj.amount;
    }, 0);
    const calculatedProfit = +calculatedSales - +sales.cost;
    console.log("ALICOST",sales.cost)
    const finalObj = {
      months: sales.months,
      sales: calculatedSales,
      cost: sales.cost,
      profit: calculatedProfit,
      year: sales.year,
    };

    return res.status(200).send({ success: true, data: finalObj });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

router.post("/", async (req, res) => {
  try {

    const calculatedSales = req.body.months.reduce(function (acc, obj) {
      return acc + +obj.amount;
    }, 0);
    const calculatedProfit = +calculatedSales - +req.body.cost;
    console.log("calculatedSales",calculatedSales);
    console.log("calculatedProfit",calculatedProfit);

    
    let sales = new Sales({
      months:req.body.months,
      sales: calculatedSales,
      cost: req.body.cost,
      profit: calculatedProfit,
      year:req.body.year
    });
    console.log("sales", sales);
    sales = await sales.save();

    if (!sales) {
      return res.status(404).send("The sales cannot be created!");
    }
    return res.status(200).send({ success: true, data: sales });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const sales = await Sales.findById(req.params.id);
    if (!sales) {
        return res.status(404).json({ success: false, message: "Sales not found" });
    }
    
    const calculatedSales = req.body.months.reduce(function (acc, obj) {
      return acc + +obj.amount;
    }, 0);
    const calculatedProfit = +calculatedSales - +req.body.cost;
    console.log("calculatedSales",calculatedSales);
    console.log("calculatedProfit",calculatedProfit);
    const updatedSales = await Sales.findByIdAndUpdate(
      req.params.id,
      {
        months:req.body.months,
        sales: calculatedSales,
        cost: req.body.cost,
        profit: calculatedProfit,
        year:req.body.year

      },
      { new: true }
    );
    if (!updatedSales) {
      return res.status(404).send("The sales cannot be updated!");
    }
    return res.status(200).send({ success: true, data: updatedSales });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedSales = await Sales.findByIdAndRemove(req.params.id);
    if (!deletedSales) {
      return res
        .status(404)
        .json({ success: false, message: "Sales not found!" });
    }
    return res.status(200).json({ success: true, message: "Sales deleted" });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

module.exports = router;
