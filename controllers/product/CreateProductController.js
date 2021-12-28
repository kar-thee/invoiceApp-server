const Product = require("../../model/productModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const CreateProductController = async (req, res) => {
  const { productName, stockQuantity, price, tax } = req.body;
  const { role } = req.userObj;
  try {
    const isEligible = CheckRoleAccess(["admin", "manager"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }

    if (!productName || !stockQuantity || !price || !tax) {
      return res
        .status(400)
        .send({ msg: "no empty values allowed", type: "error" });
    }
    const updatedName = productName.substr(0, 24);
    await Product.create({
      productName: updatedName,
      stockQuantity,
      price,
      tax,
    });
    res.send({ msg: "Product Created", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in createProductController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = CreateProductController;
