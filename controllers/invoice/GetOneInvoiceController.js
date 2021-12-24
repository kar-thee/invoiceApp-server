const Invoice = require("../../model/invoiceModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const GetOneInvoiceController = async (req, res) => {
  const { id } = req.params;
  const { role } = req.userObj;
  try {
    const isEligible = CheckRoleAccess(["admin", "manager", "employee"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }
    //
    const invoiceFound = await Invoice.findById(id);
    if (!invoiceFound) {
      return res.status(404).send({ msg: "No invoice Found", type: "error" });
    }
    res.send({ invoiceFound, msg: "invoice available", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in GetOneInvoiceController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = GetOneInvoiceController;
