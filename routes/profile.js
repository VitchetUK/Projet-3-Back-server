const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middlewares/jwt.middleware");
const User = require("../models/User.model");

module.exports = router;
