const router = require("express").Router();

const InvoiceEssentialsController = require("../controllers/private/InvoiceEssentialsController");
const SearchInvoiceController = require("../controllers/private/SearchInvoiceController");

router.get("/", (req, res) => {
  res.send({ msg: "privateRoute accessible", type: "success" });
});

//data for invoice ui
router.get("/invoiceEssentials", InvoiceEssentialsController);

//for searching data on invoice (date,customerName,creatorName etc..
//using key value pair (i.e ->req.params as key and req.query as value) as {[key]:value})
//eg:/search/invoiceDate?value=25/12/2021 ->invoiceDate as key and value as value
router.post("/search", SearchInvoiceController);

module.exports = router;
