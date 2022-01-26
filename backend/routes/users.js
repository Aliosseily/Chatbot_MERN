const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const secret = process.env.SECRET;

router.get(`/:id`, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");

    if (!user) {
      return res
        .status(500)
        .json({ success: false, message: "User not found!" });
    }
    return res.status(200).send(user);
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

router.post("/register", async (req, res) => {
  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
    });
    user = await user.save();

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "The user cannot be registered!" });
    }
    const token = jwt.sign({}, secret, { expiresIn: "1d" });
    res.status(200).send({
      id: user._id,
      name: user.name,
      user: user.email,
      token: token,
      message: "Successfully registered",
    });
  } catch ({ message }) {
    console.log("message", message);
    return res.status(500).json({ success: false, message: message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "User not found!" });
    }
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign({}, secret, { expiresIn: "1d" });
      res.status(200).send({
        id: user._id,
        name: user.name,
        user: user.email,
        token: token,
        message: "User Authenticated",
      });
    } else {
      res.status(400).send({ success: false, message: "Wrong Password!" });
    }
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        country: req.body.country,
        phone: req.body.phone,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "The user cannot be updated!" });
    }
    return res.status(200).json({ success: false, data: updatedUser });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

router.put("/updatePassword/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    if (user && bcrypt.compareSync(req.body.oldPassword, user.passwordHash)) {
      const updatedPassword = await User.findByIdAndUpdate(
        req.params.id,
        {
          passwordHash: bcrypt.hashSync(req.body.newPassword, 10),
        },
        { new: true }
      );
      if (!updatedPassword) {
        return res.status(404).json({ success: false, message: "The password cannot be updated!" });
      }
      return res.status(200).json({ success: true, data: "password updated" });
    } else {
      res.status(400).send({ success: false, message: "Wrong Old Password!" });
    }
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
  
});

module.exports = router;
