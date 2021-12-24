const Product = require("../../model/productModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const DeleteProductController = async (req, res) => {
  const { id } = req.params;
  const { role } = req.userObj;

  try {
    const isEligible = CheckRoleAccess(["admin"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }

    const productAvailable = await Product.findById(id);
    if (!productAvailable) {
      return res.status(404).send({ msg: "no product found", type: "error" });
    }

    await Product.deleteOne({ _id: id });
    res.send({ msg: "deleted product", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in DeleteProductController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = DeleteProductController;
