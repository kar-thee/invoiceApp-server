const router = require("express").Router();

const GetAllInvoiceController = require("../controllers/invoice/GetAllInvoiceController");

const CreateInvoiceController = require("../controllers/invoice/CreateInvoiceController");
const UpdateInvoiceController = require("../controllers/invoice/UpdateInvoiceController");
const DeleteInvoiceController = require("../controllers/invoice/DeleteInvoiceController");

//getAll invoices
router.get("/", GetAllInvoiceController);

//create invoice
router.post("/", CreateInvoiceController);

//update invoice
router.put("/:id", UpdateInvoiceController);

//delete invoice
router.delete("/:id", DeleteInvoiceController);

module.exports = router;
