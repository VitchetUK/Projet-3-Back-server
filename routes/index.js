const router = require("express").Router();
const protectRoute = require("../middlewares/protectRoute");

router.use("/bandReq", require("./bandReq"));
router.use("/musicianReq", require("./musicianReq"));

router.get("/", (req, res, next) => {
  res.send("Server is running... 🏃‍♂️");
});

router.get("/private", protectRoute, (req, res, next) => {
  res.send("Protection passed !");
});

router.use("/bandReq", require("./bandReq"));

module.exports = router;
