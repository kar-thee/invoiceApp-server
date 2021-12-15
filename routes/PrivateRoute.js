const router = require("express").Router();

router.get("/", (req, res) => {
  res.send({ msg: "privateRoute accessible", type: "success" });
});

module.exports = router;
