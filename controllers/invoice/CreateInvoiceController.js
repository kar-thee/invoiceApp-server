const Invoice = require("../../model/invoiceModel");
const Product = require("../../model/productModel");
const User = require("../../model/userModel");

const CheckRoleAccess = require("../../util/CheckRoleAccess");
const mailerFunc = require("../../util/mailerFunc");

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
    const diff = changeQty.stockQuantity - qty;
    changeQty.stockQuantity = parseInt(diff);
    await changeQty.save();

    const updatedName = productName.substr(0, 24);
    const createdInvoice = await Invoice.create({
      invoiceLogoImg: invoiceLogoImg || null,
      sellerName,
      customerName,
      customerEmail,
      invoiceNo,
      productName: updatedName,
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

    const employeeEmail = role === "employee" ? email : "";

    const mailingArray = [
      customerEmail,
      employeeEmail,
      process.env.ADMINEMAILADDRESS,
      process.env.MANAGEREMAILADDRESS,
    ];
    const mailDetailText = `Hi, A new Invoice created by ${name}-(${role}) from ${sellerName} organization and issued to ${customerName} (${customerEmail}) ,with invoiceNo:${invoiceNo} for product-${productName} and Totalvalue of ₹${totalFinalAmt} which will due after ${dueDate} days`;
    const data = {
      toAddress: mailingArray,
      mailSubject: "invoiceApp-New Invoice Created",
      mailContent: mailDetailText,
      mailHtml: `<div>
      <h1 style="color:#b625da;background-color: #24da545c;width: fit-content;padding: 10px;">INVOICE GENERATED</h1>
      <p style="margin: 5px auto;border: 3px solid #411265;padding:10px;line-height: 3;">
      Hi ,
       A new Invoice created by
        <span style="background-color: #6ada25;font-size: large;padding: 3px;">${name}</span> - 
        <span style="background-color: #6ada25;font-size: large;padding: 3px;">(${role})</span> from 
        <span style="background-color: #6ada25;font-size: large;padding: 3px;">${sellerName}</span> 
        organization and issued to 
        <span style="background-color: #6ada25;font-size: large;padding: 3px;">${customerName}</span> 
        having <span style="background-color: #6ada25;font-size: large;padding: 3px;">(${customerEmail})</span>,
       with <span style="background-color: #6ada25;font-size: large;padding: 3px;">invoiceNo</span> : 
       <span style="background-color: #6ada25;font-size: large;padding: 3px;">${invoiceNo}</span>
        for <span style="background-color: #6ada25;font-size: large;padding: 3px;">product</span>
        - <span style="background-color: #6ada25;font-size: large;padding: 3px;">${productName}</span>
        and <span style="background-color: #6ada25;font-size: large;padding: 3px;">Totalvalue</span> 
        of <span style="background-color: #6ada25;font-size: large;padding: 3px;">₹${totalFinalAmt}</span>
         which will due after 
         <span style="background-color: #6ada25;font-size: large;padding: 3px;">${dueDate}</span> days.      
       </p>
      <a href="${process.env.INVOICEURIEMAIL}/${createdInvoice._id}" style="border:5px solid #da25256e;padding:10px;">Click here to view Invoice or download pdf</a>
      </div>`,
    };
    await mailerFunc(data);

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
