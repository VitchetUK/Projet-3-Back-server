const router = require("express").Router();
const protectRoute = require("../middlewares/protectRoute");

router.use("/bands", require("./bandReq"));
router.use("/musicians", require("./musicianReq"));
router.use("/profile", require("./profile"));
router.use("/myRequests", require("./userReq"));

router.get("/", (req, res, next) => {
  try {
    res.send("Server is running... 🏃‍♂️");
  } catch (error) {
    next(error);
  }
});

router.get("/private", protectRoute, (req, res, next) => {
  try {
    res.send("Protection passed !");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
