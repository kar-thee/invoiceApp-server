const Invoice = require("../../model/invoiceModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const UpdateInvoiceController = async (req, res) => {
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
  } catch (e) {
    console.log(e.message, " err-in UpdateInvoiceController");
    res.status(500).send({ msg: "e.message", type: "failed" });
  }
};

module.exports = UpdateInvoiceController;
