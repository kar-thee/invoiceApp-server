const Product = require("../../model/productModel");

const CreateProductController = async (req, res) => {
  const { productName, stockQuantity, price, tax } = req.body;
  try {
    if (!productName || !stockQuantity || !price || !tax) {
      return res
        .status(400)
        .send({ msg: "no empty values allowed", type: "error" });
    }
    await Product.create({ productName, stockQuantity, price, tax });
    res.send({ msg: "Product Created", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in createProductController");
    res.status(500).send({ msg: "e.message", type: "failed" });
  }
};

module.exports = CreateProductController;
