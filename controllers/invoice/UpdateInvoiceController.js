const Invoice = require("../../model/invoiceModel");
const Product = require("../../model/productModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const UpdateInvoiceController = async (req, res) => {
  const { role } = req.userObj;
  const { id } = req.params;
  //this endpoint to change QTY,logo and dueDate only (only practical usecase)
  //-> cannot modify other things,instead of updation, delete current and create new invoice
  const { invoiceLogoImg, productName, qty, price, tax, dueDate } = req.body;
  try {
    const isEligible = CheckRoleAccess(["admin", "manager", "employee"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }
    //first such invoice available or not
    const currentInvoice = await Invoice.findById(id);
    if (!currentInvoice) {
      return res
        .status(404)
        .send({ msg: "No such invoice Available", type: "error" });
    }
    //
    const taxCost = (price * (tax / 100)).toFixed(2);
    const costAfterTax = (price * (parseFloat(tax + 100) / 100)).toFixed(2);
    const totalTaxAmt = (taxCost * qty).toFixed(2);
    const totalFinalAmt = (costAfterTax * qty).toFixed(2);

    //need to modify qty cahange from previous & current qty nos,
    //- to update in product collection
    const updatedQtyChange = qty - currentInvoice.qty;

    //change stock qty in product collection
    const changeQty = await Product.findOne({ productName });
    changeQty.stockQuantity = changeQty.stockQuantity - updatedQtyChange;
    await changeQty.save();

    const updatedInvoice = await Invoice.findByIdAndUpdate(id, {
      invoiceLogoImg: invoiceLogoImg
        ? invoiceLogoImg
        : currentInvoice.invoiceLogoImg,
      productName,
      qty,
      price,
      tax,
      taxCost,
      costAfterTax,
      totalTaxAmt,
      totalFinalAmt,
      dueDate,
    });
    if (!updatedInvoice) {
      return res
        .status(400)
        .send({ msg: "couldnot update Invoice...,try again", type: "error" });
    }

    res.send({ msg: "Updated Successfully", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in UpdateInvoiceController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = UpdateInvoiceController;
