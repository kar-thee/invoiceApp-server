const User = require("../../model/userModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const GetAllUserController = async (req, res) => {
  const { role } = req.userObj;
  try {
    const isEligible = CheckRoleAccess(["admin", "manager", "employee"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }
    const userArray = await User.find().select({
      name: 1,
      email: 1,
      role: 1,
      _id: 1,
      isVerified: 1,
    });

    res.send({
      userArray,
      type: "success",
      msg: "All userData Fetched successfully",
    });
  } catch (e) {
    console.log(e.message, " err-in GetAllUserController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = GetAllUserController;
