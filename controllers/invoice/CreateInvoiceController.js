const Invoice = require("../../model/invoiceModel");
const Product = require("../../model/productModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const CreateInvoiceController = async (req, res) => {
  const { role, name, email } = req.userObj;
  const {
    invoiceLogoImg,
    sellerName,
    customerName,
    customerEmail,
    productName,
    qty,
    price,
    tax,
    dueDate,
  } = req.body;
  try {
    const isEligible = CheckRoleAccess(["admin", "manager", "employee"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }
    //
    const taxCost = (price * (tax / 100)).toFixed(2);
    const costAfterTax = (price * (parseFloat(tax + 100) / 100)).toFixed(2);
    const totalTaxAmt = (taxCost * qty).toFixed(2);
    const totalFinalAmt = (costAfterTax * qty).toFixed(2);
    const invoiceNo = `${sellerName.substring(0, 3)}-${Date.now()
      .toString()
      .substring(2)}`;

    //change stock qty in product collection
    const changeQty = await Product.findOne({ productName });
    changeQty.stockQuantity -= qty;
    await changeQty.save();

    const createdInvoice = await Invoice.create({
      invoiceLogoImg: invoiceLogoImg || null,
      sellerName,
      customerName,
      customerEmail,
      invoiceNo,
      productName,
      qty,
      price,
      tax,
      taxCost, //added here
      costAfterTax, //added here
      totalTaxAmt, //added here
      totalFinalAmt, //added here
      invoiceCreaterName: name, //added here
      invoiceCreaterRole: role, //added here
      invoiceCreaterEmail: email, //added here
      dueDate,
    });
    if (!createdInvoice) {
      return res
        .status(400)
        .send({ msg: "couldnot create Invoice...,try again", type: "error" });
    }

    res.send({
      createdInvoice,
      msg: "Invoice Created Successfully",
      type: "success",
    });
  } catch (e) {
    console.log(e.message, " err-in CreateInvoiceController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = CreateInvoiceController;
