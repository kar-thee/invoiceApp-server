const User = require("../../model/userModel");
const mailerFunc = require("../../util/mailerFunc");
const { verifyToken } = require("../../util/tokenFunc");

const EmailActivationController = async (req, res) => {
  const { activationId } = req.body;

  try {
    if (!activationId) {
      return res
        .status(400)
        .send({ msg: "No empty values allowed", type: "error" });
    }

    const payLoad = verifyToken(activationId);
    if (!payLoad || typeof payLoad === "string") {
      return res.status(403).send({
        msg: "Value Tampered...Sign in again to get new code",
        type: "error",
      });
    }

    const userAvailable = await User.findOne({ email: payLoad.email });
    if (!userAvailable) {
      res.status(403).send({ msg: "Requst not fulfilled....", type: "error" });
    }

    if (userAvailable.isVerified) {
      return res
        .status(400)
        .send({ msg: "Id already activated...", type: "warning" });
    }
    userAvailable.isVerified = true;
    await userAvailable.save();

    const mailData = {
      toAddress: userAvailable.email,
      mailSubject: "Account activated - invoiceApp",
      mailContent: `Welcome ${userAvailable.name}, You account has been activated successfully...`,
    };
    await mailerFunc(mailData);

    res.send({ msg: "Id activated successfully", type: "success" });
  } catch (e) {
    console.log(e.message, " err-emailActivationController");
    res.status(500).send({ msg: "server issue...", type: "error" });
  }
};

module.exports = EmailActivationController;
