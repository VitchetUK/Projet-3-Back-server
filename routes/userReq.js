const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middlewares/jwt.middleware");
const BandModel = require("../models/Band.model");
const MusicianModel = require("../models/Musician.model");

// Get all requests made by the user

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.payload.id;
    const bands = await BandModel.find(
      { user: id },
      {
        __v: 0,
        isArchived: 0,
        description: 0,
      }
    ).populate("user");
    const musicians = await MusicianModel.find(
      { user: id },
      {
        __v: 0,
        isArchived: 0,
        description: 0,
      }
    ).populate("user");

    res.status(200).json({ bands, musicians });
  } catch (error) {
    next(error);
  }
});

// Delete the request on the allRequest page

router.delete("/:category/:id", isAuthenticated, async (req, res, next) => {
  try {
    if (req.params.category === "bands") {
      await BandModel.findByIdAndDelete(req.params.id);
    } else {
      await MusicianModel.findByIdAndDelete(req.params.id);
    }

    res.status(204).json({ message: "Deleted!" + req.params.id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
