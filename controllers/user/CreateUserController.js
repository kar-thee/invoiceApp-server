const User = require("../../model/userModel");

const CreateUserController = async (req, res) => {
  const { name, email, password, userType } = req.body;
  try {
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
