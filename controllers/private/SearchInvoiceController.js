const Invoice = require("../../model/invoiceModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const SearchInvoiceController = async (req, res) => {
  const { key, value } = req.body;
  const { role } = req.userObj;
  try {
    const isEligible = CheckRoleAccess(
      ["admin", "manager", "employee", "customer"],
      role
    );
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact admin..",
        type: "error",
      });
    }
    if (!key || !value) {
      return res
        .status(404)
        .send({ msg: "No empty values allowed", type: "error" });
    }
    //we can search anything based on key value pair(date,customer,creator..etc)
    //proudMoment
    const dataFoundArray = await Invoice.find({
      [key]: value,
    });

    if (dataFoundArray.length === 0) {
      return res.status(404).send({ msg: "No Data Found", type: "error" });
    }

    res.send({ msg: "Data Found", type: "success", dataFoundArray });
  } catch (e) {
    console.log(e.message, " err-SearchInvoiceController");
    res.status(500).send({ msg: e.message, type: "error" });
  }
};
module.exports = SearchInvoiceController;
