const User = require("../../model/userModel");
const { v4: uuid } = require("uuid");

const { emailValidationFunc } = require("../../util/joiValidationFunc");
const mailerFunc = require("../../util/mailerFunc");
const { signToken } = require("../../util/tokenFunc");

const ForgotPasswordController = async (req, res) => {
  const { emailId } = req.body;

  try {
    if (!emailId) {
      return res
        .status(404)
        .send({ msg: "No empty Values allowed", type: "error" });
    }

    const validationResponse = await emailValidationFunc({ emailId });
    if (validationResponse.error) {
      return res
        .status(403)
        .send({ msg: validationResponse.error.message, type: "error" });
    }

    //data sanitised
    const userAvailable = await User.findOne({ email: emailId });
    if (!userAvailable) {
      return res.status(403).send({ msg: "User not available", type: "error" });
    }

    const tokenPayload = {
      name: userAvailable.name,
      email: userAvailable.email,
      id: userAvailable._id,
    };
    const token = signToken(tokenPayload);
    const pwdCode = uuid();

    userAvailable.pwdResetCode = pwdCode;
    await userAvailable.save();

    if (!userAvailable.isVerified) {
      const mailDataforIdActivation = {
        toAddress: userAvailable.email,
        mailSubject: "Account Activation Link - invoiceApp",
        mailContent: `Welcome ${userAvailable.name}, Please Activate your account by visiting the following link -  
     ${process.env.CLIENTURL}/${token}`,
      };
      await mailerFunc(mailDataforIdActivation);

      return res.send({
        msg: "account not yet activated , so first activate and then repeat the same process again",
        type: "warning",
      });
      //if id not activated, first activate it and then repeat the same process again
    }
    //send resetPwdLink in mail
    const resetString = `${pwdCode}ihaveAmnesia${token}`;

    const mailData = {
      toAddress: userAvailable.email,
      mailSubject: "Password change request- invoiceApp",
      mailContent: `Welcome ${userAvailable.name}, Please visit the  following link to reset your account password -  
   ${process.env.CLIENT_URL_RESETPWD}/${resetString}`,
    };
    await mailerFunc(mailData);

    return res.send({
      msg: "please check your email...",
      type: "success",
    });
  } catch (e) {
    console.log(e.message, " err-forgotPwdController");
    res.status(500).send({ msg: "InternalServer issue", type: "error" });
  }
};

module.exports = ForgotPasswordController;
