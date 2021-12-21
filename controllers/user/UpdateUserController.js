const User = require("../../model/userModel");

const UpdateUserController = async (req, res) => {
  const { email, name, id, role } = req.body;
  try {
    const userAvailable = await User.findById(id);

    if (!userAvailable) {
      return res.status(404).send({ msg: "no user Found", type: "error" });
    }
    await User.findByIdAndUpdate(id, { name, email, role });

    res.send({ msg: "updated user info", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in UpdateUserController");
    res.status(500).send({ msg: "e.message", type: "failed" });
  }
};

module.exports = UpdateUserController;
