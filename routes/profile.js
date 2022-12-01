const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middlewares/jwt.middleware");
const User = require("../models/User.model");

router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
