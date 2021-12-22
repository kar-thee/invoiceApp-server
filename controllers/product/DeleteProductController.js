const Product = require("../../model/productModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const DeleteProductController = async (req, res) => {
  const { productName } = req.body;
  const { role } = req.userObj;

  try {
    const isEligible = CheckRoleAccess(["admin"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }

    await Product.deleteOne({ productName });
    res.send({ msg: "deleted product", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in createProductController");
    res.status(500).send({ msg: "e.message", type: "failed" });
  }
};

module.exports = DeleteProductController;
