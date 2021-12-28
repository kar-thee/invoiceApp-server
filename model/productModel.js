const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = schema({
  productName: {
    type: String,
    required: true,
    unique: true,
    maxLength: 25,
  },
  stockQuantity: {
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
});

const Product = mongoose.model("product", productSchema, "productCollection");

module.exports = Product;
