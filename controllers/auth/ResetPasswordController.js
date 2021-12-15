const User = require("../../model/userModel");
const { encryptFunc } = require("../../util/cryptoFunc");
const mailerFunc = require("../../util/mailerFunc");
const { verifyToken } = require("../../util/tokenFunc");

const ResetPasswordController = async (req, res) => {
  const { resetCode, newPassword } = req.body;
  const tokenHeader = req.headers.authorization;

  try {
    if (!resetCode || !newPassword || !tokenHeader) {
      return res
        .status(400)
        .send({ msg: "No empty values allowed", type: "error" });
    }

    const token = tokenHeader.split(" ")[1];
    const userPayLoad = verifyToken(token);

    if (!userPayLoad || typeof payLoad === "string") {
      return res.status(400).send({
        msg: "couldnot process request/token tampered ..pls repeat the process again",
        type: "error",
      });
    }
    const userAvailable = await User.findOne({ email: userPayLoad.email });
    if (!userAvailable) {
      return res.status(400).send({ msg: "No user found", type: "error" });
    }

    if (userAvailable.pwdResetCode !== resetCode) {
      return res.status(403).send({
        msg: "Not valid request,please repeat the forgotPwd process",
        type: "error",
      });
    }
    //all looking good...resetNow

    const newEncryptedPwd = await encryptFunc(newPassword);
    userAvailable.password = newEncryptedPwd;
    userAvailable.pwdResetCode = undefined;
    await userAvailable.save();

    //send mail to inform user that pwd was changed
    const mailData = {
      toAddress: userAvailable.email,
      mailSubject: "Password reset completed - invoiceApp",
      mailContent: `Welcome ${userAvailable.name}, You password has been changed successfully..`,
    };
    await mailerFunc(mailData);
    res.send({ msg: "Successfully password changed", type: "success" });
  } catch (e) {
    console.log(e.message, " err-resetPwdController");
    res.status(500).send({ msg: "server issue....", type: "error" });
  }
};

module.exports = ResetPasswordController;
