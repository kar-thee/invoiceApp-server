const mongoose = require("mongoose");
const schema = mongoose.Schema;

const invoiceSchema = schema({
  invoiceLogoImg: {
    type: String,
    default: null,
  },
  sellerName: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  invoiceNo: {
    type: String,
    required: true,
  },
  invoiceDate: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
  productName: {
    type: String,
    required: true,
    maxLength: 25,
  },
  qty: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  taxCost: {
    type: Number,
    required: true,
  },
  costAfterTax: {
    type: Number,
    required: true,
  },
  totalTaxAmt: {
    type: Number,
    required: true,
  },
  totalFinalAmt: {
    type: Number,
    required: true,
  },
  invoiceCreaterName: {
    type: String,
    required: true,
  },
  invoiceCreaterRole: {
    type: String,
    required: true,
  },
  invoiceCreaterEmail: {
    type: String,
    required: true,
  }, //for future purpose
  dueDate: {
    type: Number,
    required: true,
    enum: [7, 15, 30, 60, 90],
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema, "invoiceCollection");

module.exports = Invoice;
