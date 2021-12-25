const router = require("express").Router();

const GetOneInvoiceController = require("../controllers/public/GetOneInvoiceController");
const CreatePdfFromHtmlController = require("../controllers/public/CreatePdfFromHtmlController");

//check server
router.get("/e", (req, res) => {
  res.send({ msg: "appServer is available" });
});

//find invoice by id - getOne invoice
router.get("/invoice/:id", GetOneInvoiceController);

//generatePdf
router.get("/invoice/pdf/:id", CreatePdfFromHtmlController);

module.exports = router;
