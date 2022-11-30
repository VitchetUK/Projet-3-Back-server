const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middlewares/jwt.middleware");
const User = require("../models/User.model");
const Band = require("../models/Band.model");

router.status(200).get("/allBandRequest", async (req, res, next) => {
  res.json(await Band.find());
});

router.status(200).get("/allBandRequest/:id", async (req, res, next) => {
  try {
    const oneBandReq = await Band.findById(req.params.id);

    res.status(200).json(oneBandReq);
  } catch (error) {
    next(error);
  }
});

router.post("/allBandRequest", async (req, res, next) => {
  const {
    user,
    searchedMusician,
    musicStyle,
    city,
    description,
    availability,
  } = req.body;
  const band = await Band.create({
    user,
    searchedMusician,
    musicStyle,
    city,
    description,
    availability,
  });
  res.json(band);
});

module.exports = router;
