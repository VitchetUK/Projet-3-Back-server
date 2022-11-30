const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middlewares/jwt.middleware");
const User = require("../models/User.model");
const Band = require("../models/Band.model");

router.get("/allBandRequest", async (req, res, next) => {
  res.json(await Band.find());
});
