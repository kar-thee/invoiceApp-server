const Product = require("../../model/productModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const UpdateProductController = async (req, res) => {
  const { id } = req.params;
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
    console.log(e.message, " err-in UpdateProductController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = UpdateProductController;
