const Product = require("../../model/productModel");
const User = require("../../model/userModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const InvoiceEssentialsController = async (req, res) => {
  const { role } = req.userObj;
  try {
    const isEligible = CheckRoleAccess(["admin", "manager", "employee"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact  admin..",
        type: "error",
      });
    }

    const customersArray = await User.find({ role: "customer" }).select({
      name: 1,
      email: 1,
      _id: 1,
    });
    if (!customersArray) {
      return res.status(404).send({
        msg: "No Customers found, first add customers contact admin/manager",
        type: "error",
      });
    }

    const productsArray = await Product.find({ stockQuantity: { $gte: 1 } });
    if (!productsArray) {
      return res.status(404).send({
        msg: "No Products found, first add Products contact admin/manager",
        type: "error",
      });
    }

    const invoiceEssentialData = {
      customersArray,
      productsArray,
    };

    res.send({
      invoiceEssentialData,
      msg: "Invoice essential Data Ready",
      type: "success",
    });
  } catch (e) {
    console.log(e.message, " err-in InvoiceEssentialsController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = InvoiceEssentialsController;
