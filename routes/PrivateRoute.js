const router = require("express").Router();

const InvoiceEssentialsController = require("../controllers/private/InvoiceEssentialsController");

router.get("/", (req, res) => {
  res.send({ msg: "privateRoute accessible", type: "success" });
});

router.get("/invoiceEssentials", InvoiceEssentialsController);

module.exports = router;
