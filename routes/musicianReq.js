const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middlewares/jwt.middleware");
const User = require("../models/User.model");
const Musician = require("../models/Musician.model");

router.get("/allMusicianRequest", async (req, res, next) => {
  res.status(200).json(await Musician.find());
});

router.get("/allMusicianRequest/:id", async (req, res, next) => {
  try {
    const oneMusicianRequest = await Musician.findById(req.params.id);

    res.status(200).json(oneMusicianRequest);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
