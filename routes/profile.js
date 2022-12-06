const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const isAuthenticated = require("../middlewares/jwt.middleware");
const User = require("../models/User.model");
const uploader = require("../config/cloudinary");

router.get("/", isAuthenticated, async (req, res) => {
  try {
    console.log(req.payload);

    const id = req.payload.id;
    const user = await User.findById(id, { password: 0 });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Post/Create an account

router.patch(
  "/",
  uploader.single("picture"),
  isAuthenticated,
  async (req, res) => {
    try {
      const userId = req.payload.id;

      const { name, username, phone, age, twitter, instagram, displayEmail } =
        req.body;

      try {
        let userUpdate;
        let picture;
        if (req.file) {
          picture = req.file.path;
        }

        userUpdate = await User.findByIdAndUpdate(
          userId,
          {
            name,
            username,
            phone,
            age,
            twitter,
            instagram,
            displayEmail,
            picture,
          },
          { new: true }
        );
        res.status(200).json(userUpdate);
        //user = userUpdate;
        //await userUpdate.save();
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
