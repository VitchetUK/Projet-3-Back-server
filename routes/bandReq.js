const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middlewares/jwt.middleware");
const Band = require("../models/Band.model");

router.get("/allBands", async (req, res, next) => {
  try {
    res.status(200).json(await Band.find());
  } catch (error) {
    next(error);
  }
});

router.get("/allBands/:id", async (req, res, next) => {
  try {
    const oneBandReq = await Band.findById(req.params.id);

    res.status(200).json(oneBandReq);
  } catch (error) {
    next(error);
  }
});

router.post("/allBands/create", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.payload.id;

    const { user, searchedMusician, musicStyle, city, description } = req.body;
    const band = await Band.create({
      user: id,
      searchedMusician,
      musicStyle,
      city,
      description,
    });
    const reqBand = band.toObject();

    res.status(201).json({ reqBand });
  } catch (error) {
    next(error);
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Sweet, sweet 500." });
  }
});

module.exports = router;
