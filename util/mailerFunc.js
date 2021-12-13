const nodemailer = require("nodemailer");

const mailerFunc = async (data) => {
  try {
    const { toAddress, mailSubject, mailContent } = data;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_MAIL_ID,
        pass: process.env.SENDER_MAIL_PWD,
      },
    });
    const mailOptions = {
      from: process.env.SENDER_MAIL_ID,
      to: toAddress,
      subject: mailSubject,
      text: mailContent,
    };

    const response = await transporter.sendMail(mailOptions);
    return response;
  } catch (e) {
    console.log(e, " xerr-mailFunc");
  }
};

module.exports = mailerFunc;
