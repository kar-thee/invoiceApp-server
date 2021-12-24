const User = require("../../model/userModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");
const { encryptFunc } = require("../../util/cryptoFunc");

const CreateUserController = async (req, res) => {
  const { name, email, password, userType } = req.body;
  const { role } = req.userObj;

  try {
    const isEligible = CheckRoleAccess(["admin", "manager"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }
    //save only encrypted pwd
    const encryptedPswOne = await encryptFunc(password);
    const encryptedPswTwo = await encryptFunc("password1@");

    await User.create({
      name: name || "customerName",
      email: email || "customer@invoiceApp.com",
      password: password ? encryptedPswOne : encryptedPswTwo,
      role: userType || "customer",
    });
    res.send({ msg: "User Created Successfully", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in createUserController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = CreateUserController;
