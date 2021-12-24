const Product = require("../../model/productModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const GetOneProductController = async (req, res) => {
  const { role } = req.userObj;
  const { id } = req.params;
  try {
    const isEligible = CheckRoleAccess(["admin", "manager", "employee"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }

    const productFound = await Product.findById(id);
    if (!productFound) {
      return res.status(404).send({ msg: "No product Found", type: "error" });
    }

    res.send({ productFound, msg: "product available", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in GetOneProductController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = GetOneProductController;
