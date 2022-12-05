const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middlewares/jwt.middleware");
const User = require("../models/User.model");
const uploader = require("../config/cloudinary");
const Band = require("../models/Band.model");
const Musician = require("../models/Musician.model");
const BandModel = require("../models/Band.model");
const MusicianModel = require("../models/Musician.model");

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.payload.id;
    const bands = await BandModel.find({ user: id });
    const musicians = await MusicianModel.find({ user: id });

    res.status(200).json({ bands, musicians });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
