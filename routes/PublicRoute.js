const router = require("express").Router();

const GetOneInvoiceController = require("../controllers/public/GetOneInvoiceController");
//check server
router.get("/e", (req, res) => {
  res.send({ msg: "appServer is available" });
});

//find invoice by id - getOne invoice
router.get("/invoice/:id", GetOneInvoiceController);

module.exports = router;
