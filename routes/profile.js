const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middlewares/jwt.middleware");
const User = require("../models/User.model");

router.get("/", isAuthenticated, async (req, res) => {
  try {
    console.log(req.payload);

    const id = req.payload.id;
    const user = await User.findById(id, { name: 1, email: 1 });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload.id;
    const user = req.payload;

    const {
      name,
      username,
      email,
      phone,
      age,
      twitter,
      instagram,
      displayEmail,
    } = req.body;

    try {
      let userUpdate;

      userUpdate = await User.findByIdAndUpdate(userId, {
        name,
        username,
        email,
        phone,
        age,
        twitter,
        instagram,
        displayEmail,
      });

      user = userUpdate;
      await userUpdate.save();
      res.redirect("/");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
