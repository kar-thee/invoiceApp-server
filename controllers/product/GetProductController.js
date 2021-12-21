const Product = require("../../model/productModel");

const GetProductController = async (req, res) => {
  try {
    const productArray = await Product.find();
    res.send({ productArray, msg: "Listed product array", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in createProductController");
    res.status(500).send({ msg: "e.message", type: "failed" });
  }
};

module.exports = GetProductController;
