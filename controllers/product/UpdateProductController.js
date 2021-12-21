const Product = require("../../model/productModel");

const UpdateProductController = async (req, res) => {
  const { id, productName, stockQuantity, price, tax } = req.body;

  try {
    const productAvailable = await Product.findById(id);
    if (!productAvailable) {
      return res
        .status(404)
        .send({ msg: "no product available", type: "error" });
    }
    await Product.findByIdAndUpdate(id, {
      productName,
      price,
      tax,
      stockQuantity,
    });
    res.send({ msg: "updated product data", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in createProductController");
    res.status(500).send({ msg: "e.message", type: "failed" });
  }
};

module.exports = UpdateProductController;
