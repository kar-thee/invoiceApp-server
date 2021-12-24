const Product = require("../../model/productModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const GetProductsController = async (req, res) => {
  const { role } = req.userObj;

  try {
    const isEligible = CheckRoleAccess(["admin", "manager", "employee"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }

    const productArray = await Product.find();
    res.send({ productArray, msg: "Listed product array", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in GetProductsController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = GetProductsController;
