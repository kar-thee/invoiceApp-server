const User = require("../../model/userModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

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

    await User.create({
      name: name || "customerName",
      email: email || "customer@invoiceApp.com",
      password: password || "password1@",
      role: userType || "customer",
    });
    res.send({ msg: "User Created Successfully", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in createUserController");
    res.status(500).send({ msg: "e.message", type: "failed" });
  }
};

module.exports = CreateUserController;
