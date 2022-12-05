const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middlewares/jwt.middleware");
const User = require("../models/User.model");
const uploader = require("../config/cloudinary");
const Band = require("../models/Band.model");
const Musician = require("../models/Musician.model");

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.payload.id;

    const aggRequests = [
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "bands",
          localField: "_id",
          foreignField: "user",
          as: "bands",
        },
      },
      {
        $lookup: {
          from: "musicians",
          localField: "_id",
          foreignField: "user",
          as: "musicians",
        },
      },
      {
        $unwind: {
          path: "$bands",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $unwind: {
          path: "$musicians",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: {
          bands: 1,
          musicians: 1,
        },
      },
    ];
    result = await User.aggregate(aggRequests);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
