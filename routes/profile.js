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

module.exports = router;
