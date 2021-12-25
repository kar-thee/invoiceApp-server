const Invoice = require("../../model/invoiceModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const SearchInvoiceController = async (req, res) => {
  const { key } = req.params;
  const { value } = req.query;
  const { role } = req.userObj;
  try {
    const isEligible = CheckRoleAccess(["admin", "manager", "employee"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact  admin..",
        type: "error",
      });
    }
    //we can search anything based on key value pair(date,customer,creator..etc)
    //proudMoment
    const dataFoundArray = await Invoice.find({
      [key]: value,
    });
    if (dataFoundArray.length < 1) {
      return res.status(404).send({ msg: "No Data Found", type: "error" });
    }

    res.send({ msg: "Data Found", type: "success", dataFoundArray });
  } catch (e) {
    console.log(e.message, " err-SearchInvoiceController");
    res.status(500).send({ msg: e.message, type: "error" });
  }
};
module.exports = SearchInvoiceController;
