const express = require("express");
const router = express.Router();
const { Product } = require("../models/products");

router.get("/", async (req, res) => {
  try {
    const productsList = await Product.find();
    if (!productsList) {
      return res.status(404).json({ success: false, message: "Cannot load products" });
    }
    return res.status(200).send({ success: true, data: productsList });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(200).send({ success: true, data: product });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

router.post("/", async (req, res) => {
  try {
    let product = new Product({
      name: req.body.name,
    });
    console.log("product", product);
    product = await product.save();

    if (!product) {
      return res.status(404).send("The product cannot be created!");
    }
    return res.status(200).send({ success: true, data: product });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).send("The product cannot be updated!");
    }
    return res.status(200).send({ success: false, data: updatedProduct });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndRemove(req.params.id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found!" });
    }
    return res.status(200).json({ success: true, message: "Product deleted" });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

module.exports = router;
