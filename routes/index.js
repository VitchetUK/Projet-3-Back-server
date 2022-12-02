const router = require("express").Router();
const protectRoute = require("../middlewares/protectRoute");

router.use("/bands", require("./bandReq"));
router.use("/musicians", require("./musicianReq"));
router.use("/profile", require("./profile"));
router.use("/userReq", require("./userReq"));

router.get("/", (req, res, next) => {
  res.send("Server is running... 🏃‍♂️");
});

router.get("/private", protectRoute, (req, res, next) => {
  res.send("Protection passed !");
});

// router.use("/bandReq", require("./bandReq"));

module.exports = router;
