const User = require("../../model/userModel");
const { signinValidationFunc } = require("../../util/joiValidationFunc");
const { decryptFunc } = require("../../util/cryptoFunc");
const { signToken } = require("../../util/tokenFunc");
const mailerFunc = require("../../util/mailerFunc");

const SigninController = async (req, res) => {
  const { password, email } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .send({ msg: "no empty values allowed", type: "error" });
    }

    const validationResponse = await signinValidationFunc({ email, password });
    if (validationResponse.error) {
      return res
        .status(403)
        .send({ msg: validationResponse.error.message, type: "error" });
    }
    //data sanitised

    const userAvailable = await User.findOne({ email });
    if (!userAvailable) {
      return res.status(403).send({ msg: "User not available", type: "error" });
    }

    const isPswEqual = await decryptFunc(password, userAvailable.password);
    if (!isPswEqual) {
      return res
        .status(401)
        .send({ msg: "credentials are not valid", type: "error" });
    }
    //here- valid user
    const tokenPayload = {
      name: userAvailable.name,
      email: userAvailable.email,
      id: userAvailable._id,
      role: userAvailable.role,
    };
    const token = signToken(tokenPayload);

    if (!userAvailable.isVerified) {
      const mailData = {
        toAddress: userAvailable.email,
        mailSubject: "Account Activation Link - invoiceApp",
        mailContent: `Welcome ${userAvailable.name}, Please Activate your account by visiting the following link -  
         ${process.env.CLIENT_URL_ACCOUNTACTIVATION}/${token}`,
      };
      await mailerFunc(mailData);
    }

    res.send({
      token,
      msg: `Welcome ${userAvailable.name}`,
      type: "success",
      isVerified: userAvailable.isVerified,
      role: userAvailable.role,
    });
  } catch (e) {
    console.log(e.message, " err-signupController");
    res.status(500).send({ msg: "server probs...", type: "error" });
  }
};

module.exports = SigninController;
