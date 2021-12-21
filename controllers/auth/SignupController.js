const User = require("../../model/userModel");
const { signupValidationFunc } = require("../../util/joiValidationFunc");
const { encryptFunc } = require("../../util/cryptoFunc");
const { signToken } = require("../../util/tokenFunc");
const mailerFunc = require("../../util/mailerFunc");

const SignupController = async (req, res) => {
  const { name, email, password, userType } = req.body;
  try {
    if (!name || !email || !password || !userType) {
      return res
        .status(400)
        .send({ msg: "no empty values allowed", type: "error" });
    }
    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
      return res
        .status(403)
        .send({ msg: "User already present", type: "error" });
    }

    const validationResponse = await signupValidationFunc({
      email,
      name,
      password,
    });

    if (validationResponse.error) {
      return res
        .status(403)
        .send({ msg: validationResponse.error.message, type: "error" });
    }
    //data sanitised
    const encryptedPsw = await encryptFunc(password);

    const createdUser = await User.create({
      name,
      email,
      password: encryptedPsw,
      role: userType,
    });
    if (!createdUser) {
      return res
        .status(500)
        .send({ msg: "Couldnot create user", type: "error" });
    }

    const tokenPayload = {
      name: createdUser.name,
      email: createdUser.email,
      id: createdUser._id,
      role: createdUser.role,
    };
    const token = signToken(tokenPayload);

    const mailData = {
      toAddress: createdUser.email,
      mailSubject: "Welcome to invoiceApp",
      mailContent: `Welcome ${createdUser.name}, Please Activate your account by visiting the following link -  
       ${process.env.CLIENT_URL_ACCOUNTACTIVATION}/${token}`,
    };
    await mailerFunc(mailData);

    res.send({
      token,
      role: createdUser.role,
      msg: "Successfully registered user, please activate your account",
      type: "success",
    });
  } catch (e) {
    console.log(e.message, " err-signupController");
    res.status(500).send({ msg: "server probs...", type: "error" });
  }
};

module.exports = SignupController;
