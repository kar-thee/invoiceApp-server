const User = require("../../model/userModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const UpdateUserController = async (req, res) => {
  const { id } = req.params;
  const { email, name, userType } = req.body;
  const { role } = req.userObj;

  try {
    const isEligible = CheckRoleAccess(["admin", "manager"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }
    const userAvailable = await User.findById(id);

    if (!userAvailable) {
      return res.status(404).send({ msg: "no user Found", type: "error" });
    }
    await User.findByIdAndUpdate(id, { name, email, role: userType });

    res.send({ msg: "updated user info", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in UpdateUserController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = UpdateUserController;
