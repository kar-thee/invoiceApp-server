const Invoice = require("../../model/invoiceModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const DeleteInvoiceController = async (req, res) => {
  const { id } = req.params;
  const { role } = req.userObj;
  try {
    const isEligible = CheckRoleAccess(["admin", "manager"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }
    //
    const invoiceAvailable = await Invoice.findById(id);
    if (!invoiceAvailable) {
      return res.status(404).send({ msg: "no invoice found", type: "error" });
    }

    await Invoice.deleteOne({ _id: id });
    res.send({ msg: "deleted invoice successfully", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in DeleteInvoiceController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = DeleteInvoiceController;
