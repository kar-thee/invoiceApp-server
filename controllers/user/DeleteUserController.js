const User = require("../../model/userModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const DeleteUserController = async (req, res) => {
  const { email } = req.params;
  const { role } = req.userObj;
  try {
    const isEligible = CheckRoleAccess(["admin"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your Admin..",
        type: "error",
      });
    }

    const userAvailable = await User.findOne({ email });

    if (!userAvailable) {
      return res.status(404).send({ msg: "no user found", type: "error" });
    }
    // if (userAvailable.role && userAvailable.role !== userType) {
    //   return res
    //     .status(404)
    //     .send({ msg: "userRole is not valid", type: "error" });
    // }
    await User.deleteOne({ email });

    res.send({ msg: "User successfully removed", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in DeleteUserController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = DeleteUserController;
