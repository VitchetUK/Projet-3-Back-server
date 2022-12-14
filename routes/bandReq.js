const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middlewares/jwt.middleware");
const Band = require("../models/Band.model");

// Get all requests made by bands looking for musician(s)

router.get("/", async (req, res, next) => {
  try {
    const { searchedMusician, city, musicStyle } = req.query;
    const searchQ = {};
    if (searchedMusician) {
      searchQ.searchedMusician = new RegExp(searchedMusician);
    }
    if (city) {
      searchQ.city = new RegExp(city);
    }
    if (musicStyle) {
      searchQ.musicStyle = new RegExp(musicStyle);
    }
    res
      .status(200)
      .json(
        await Band.find(searchQ, {
          __v: 0,
          isArchived: 0,
          description: 0,
        }).populate("user")
      );
  } catch (error) {
    next(error);
  }
});

// Get one specific request when cliked on it

router.get("/:id", async (req, res, next) => {
  try {
    const oneBandReq = await Band.findById(req.params.id).populate("user");

    res.status(200).json(oneBandReq);
  } catch (error) {
    next(error);
  }
});

// Post/Create the request as a band, to look for musician(s)

router.post("/", isAuthenticated, async (req, res, next) => {
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
