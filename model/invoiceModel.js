const mongoose = require("mongoose");
const schema = mongoose.Schema;

const invoiceSchema = schema({});

const Invoice = mongoose.model("Invoice", invoiceSchema, "invoiceCollection");

module.exports = Invoice;
