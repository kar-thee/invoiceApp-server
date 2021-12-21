const Product = require("../../model/productModel");

const DeleteProductController = async (req, res) => {
  const { productName } = req.body;
  try {
    await Product.deleteOne({ productName });
    res.send({ msg: "deleted product", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in createProductController");
    res.status(500).send({ msg: "e.message", type: "failed" });
  }
};

module.exports = DeleteProductController;
