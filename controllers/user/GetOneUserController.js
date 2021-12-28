const User = require("../../model/userModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const GetOneUserController = async (req, res) => {
  const { role } = req.userObj;
  const { id } = req.params;
  try {
    const isEligible = CheckRoleAccess(["admin", "manager", "employee"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }
    const userFound = await User.findById(id).select({
      name: 1,
      email: 1,
      role: 1,
      _id: 1,
      isVerified: 1,
    });
    if (!userFound) {
      return res.status(404).send({ msg: "No user Found", type: "error" });
    }

    res.send({
      userFound,
      type: "success",
      msg: "userData Fetched successfully",
    });
  } catch (e) {
    console.log(e.message, " err-in GetOneUserController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = GetOneUserController;
