const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middlewares/jwt.middleware");
const User = require("../models/User.model");
const Musician = require("../models/Musician.model");
const { route } = require("./auth");

router.get("/", async (req, res, next) => {
  res.status(200).json(await Musician.find());
});

router.get("/:id", async (req, res, next) => {
  try {
    const oneMusicianRequest = await Musician.findById(req.params.id).populate(
      "user"
    );

    res.status(200).json(oneMusicianRequest);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.payload.id;

    const {
      user,
      instruments,
      musicStyle,
      city,
      experience,
      description,
      availability,
    } = req.body;
    const musician = await Musician.create({
      user: id,
      instruments,
      musicStyle,
      city,
      experience,
      description,
      availability,
    });
    res.status(201).json(musician);
  } catch (error) {
    next(error);
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Sweet, sweet 500." });
  }
});

module.exports = router;
