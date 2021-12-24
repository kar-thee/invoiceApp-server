const router = require("express").Router();

const GetAllInvoiceController = require("../controllers/invoice/GetAllInvoiceController");
const CreateInvoiceController = require("../controllers/invoice/CreateInvoiceController");
const UpdateInvoiceController = require("../controllers/invoice/UpdateInvoiceController");
const DeleteInvoiceController = require("../controllers/invoice/DeleteInvoiceController");

router.get("/", GetAllInvoiceController);

router.post("/", CreateInvoiceController);

router.put("/", UpdateInvoiceController);

router.delete("/", DeleteInvoiceController);

module.exports = router;
